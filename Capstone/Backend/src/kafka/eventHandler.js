import { v4 as uuidv4 } from 'uuid'
import { updateAggregate } from '../features/aggregator.js'

export async function processEvent({ event, redis, db, logger, metrics }) {
  const eventsCol = db.collection('events')
  try {
    await eventsCol.insertOne({ ...event, _ingestedAt: new Date() })
  } catch (e) {
    if (e.code === 11000) return
    throw e
  }
  const defs = await db.collection('feature_definitions').find({ active: true }).toArray()
  for (const def of defs) {
    if (def.aggregation) {
      const result = await updateAggregate({ def, event, redis })
      const fhCol = db.collection('feature_history')
      await fhCol.updateOne(
        { featureSet: def.featureSet, featureName: def.featureName, entityId: event.entityId, as_of: new Date(event.eventTime) },
        { $set: { value: result.value, computed_at: new Date(), version: def.version } },
        { upsert: true }
      )
    }
  }
}
