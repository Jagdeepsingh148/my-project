import 'dotenv/config'
import { createMongoClient } from '../storage/mongoClient.js'
import Redis from 'ioredis'
import { updateAggregate } from '../features/aggregator.js'

async function runBackfill() {
  const mongo = await createMongoClient(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017')
  const db = mongo.db(process.env.MONGO_DB || 'featurestore')
  const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')
  const cursor = db.collection('events').find({}).sort({ eventTime: 1 })
  for await (const e of cursor) {
    const defs = await db.collection('feature_definitions').find({ active: true }).toArray()
    for (const def of defs) {
      if (def.aggregation) {
        await updateAggregate({ def, event: e, redis })
        await db.collection('feature_history').updateOne(
          { featureSet: def.featureSet, featureName: def.featureName, entityId: e.entityId, as_of: new Date(e.eventTime) },
          { $set: { value: {}, computed_at: new Date(), version: def.version } },
          { upsert: true }
        )
      }
    }
  }
  process.exit(0)
}

runBackfill().catch(e => { console.error(e); process.exit(1) })
