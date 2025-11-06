import { REDIS_KEY_PATTERN } from '../utils/constants.js'

export class FeatureStore {
  constructor(redis, db) {
    this.redis = redis
    this.db = db
  }

  async getOnline(featureSet, version, entityId) {
    const key = REDIS_KEY_PATTERN(featureSet, version, entityId)
    const data = await this.redis.get(key)
    return data ? JSON.parse(data) : null
  }

  async getOffline(featureSet, entityId, as_of) {
    return await this.db.collection('feature_history')
      .find({ featureSet, entityId, as_of: { $lte: new Date(as_of) } })
      .sort({ as_of: -1 })
      .limit(1)
      .next()
  }

  async upsertOffline(feature) {
    const col = this.db.collection('feature_history')
    await col.updateOne(
      { featureSet: feature.featureSet, entityId: feature.entityId, as_of: feature.as_of },
      { $set: feature },
      { upsert: true }
    )
  }
}
