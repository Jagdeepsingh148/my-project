import Redis from 'ioredis'
import { createMongoClient } from '../storage/mongoClient.js'
import { runReplay } from './replayService.js'
import { promoteShadow } from './shadowWriter.js'

export async function runBackfillPipeline() {
  const mongo = await createMongoClient(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017')
  const db = mongo.db(process.env.MONGO_DB || 'featurestore')
  const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')
  const defs = await db.collection('feature_definitions').find({ active: true }).toArray()

  console.log('Starting backfill replay...')
  await runReplay()

  for (const def of defs) await promoteShadow(redis, def)

  console.log('Backfill pipeline completed')
  process.exit(0)
}

if (process.argv[1].endsWith('backfillRunner.js')) {
  runBackfillPipeline().catch(e => {
    console.error(e)
    process.exit(1)
  })
}
