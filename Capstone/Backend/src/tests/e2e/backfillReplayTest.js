import { strict as assert } from 'assert'
import { createMongoClient } from '../../storage/mongoClient.js'
import Redis from 'ioredis-mock'
import { updateAggregate } from '../../features/aggregator.js'

describe('Backfill Replay', () => {
  it('recomputes features into Redis', async () => {
    const mongo = await createMongoClient('mongodb://127.0.0.1:27017')
    const db = mongo.db('test_featurestore')
    const redis = new Redis()
    const def = { featureSet: 'user_profile_rolling', version: 1, aggregation: { window_ms: 10000000, agg_name: 'sum' } }
    const event = { entityId: 'user1', eventTime: new Date().toISOString(), payload: { amount: 42 } }
    await updateAggregate({ def, event, redis })
    const keys = await redis.keys('fs:*')
    assert(keys.length > 0)
  })
})
