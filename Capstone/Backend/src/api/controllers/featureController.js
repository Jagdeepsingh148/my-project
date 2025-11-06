import Joi from 'joi'

export function featureControllerFactory({ redis, db, logger, metrics }) {
  async function getFeatures(req, res) {
    const schema = Joi.object({ entityId: Joi.string().required(), set: Joi.string().required(), as_of: Joi.string().isoDate().optional() })
    const { error, value } = schema.validate(req.query)
    if (error) return res.status(400).send({ error: error.message })
    const { entityId, set, as_of } = value
    const def = await db.collection('feature_definitions').findOne({ featureSet: set, active: true })
    if (!def) return res.status(404).send({ error: 'feature set not found' })
    if (as_of) {
      const doc = await db.collection('feature_history').find({ featureSet: set, entityId, as_of: { $lte: new Date(as_of) } }).sort({ as_of: -1 }).limit(1).next()
      if (!doc) return res.status(404).send({ error: 'no data for as_of' })
      return res.send({ featureSet: set, entityId, value: doc.value, as_of: doc.as_of })
    } else {
      const key = `fs:${set}:v${def.version}:entity:${entityId}`
      const raw = await redis.get(key)
      if (raw) {
        const parsed = JSON.parse(raw)
        return res.send({ featureSet: set, entityId, value: parsed.value, computed_at: parsed.computed_at })
      } else {
        const doc = await db.collection('feature_history').find({ featureSet: set, entityId }).sort({ as_of: -1 }).limit(1).next()
        if (!doc) return res.status(404).send({ error: 'no data' })
        return res.send({ featureSet: set, entityId, value: doc.value, as_of: doc.as_of })
      }
    }
  }

  async function getFeaturesBatch(req, res) {
    const schema = Joi.object({ entityIds: Joi.string().required(), set: Joi.string().required() })
    const { error, value } = schema.validate(req.query)
    if (error) return res.status(400).send({ error: error.message })
    const entityIds = value.entityIds.split(',')
    const def = await db.collection('feature_definitions').findOne({ featureSet: value.set, active: true })
    if (!def) return res.status(404).send({ error: 'feature set not found' })
    const keys = entityIds.map(id => `fs:${value.set}:v${def.version}:entity:${id}`)
    const raws = await redis.mget(keys)
    const results = []
    for (let i = 0; i < entityIds.length; i++) {
      if (raws[i]) {
        results.push({ entityId: entityIds[i], value: JSON.parse(raws[i]).value })
      } else {
        const doc = await db.collection('feature_history').find({ featureSet: value.set, entityId: entityIds[i] }).sort({ as_of: -1 }).limit(1).next()
        results.push({ entityId: entityIds[i], value: doc ? doc.value : null })
      }
    }
    res.send({ featureSet: value.set, results })
  }

  return { getFeatures, getFeaturesBatch }
}
