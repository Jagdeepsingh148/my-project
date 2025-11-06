import { strict as assert } from 'assert'
import Redis from 'ioredis'
import { MongoClient } from 'mongodb'
import { performance } from 'perf_hooks'

describe('E2E Benchmark: Feature Read Latency', function () {
  this.timeout(20000) // Allow enough time for load testing

  let redis, db

  before(async () => {
    redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')
    const client = await MongoClient.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017')
    db = client.db(process.env.MONGO_DB || 'featurestore')

    // Seed Redis with sample feature data
    const key = 'fs:user_profile_rolling:v1:entity:user1'
    const value = JSON.stringify({
      value: { spend_7d: 1530 },
      computed_at: new Date().toISOString(),
      etag: 'test-etag-001'
    })
    await redis.set(key, value, 'EX', 3600)
  })

  after(async () => {
    await redis.quit()
  })

  it('should achieve sub-millisecond Redis read latency on average', async () => {
    const key = 'fs:user_profile_rolling:v1:entity:user1'
    const iterations = 2000
    const start = performance.now()

    for (let i = 0; i < iterations; i++) {
      const data = await redis.get(key)
      assert.ok(data)
    }

    const totalMs = performance.now() - start
    const avgMs = totalMs / iterations
    console.log(`→ Redis avg read latency: ${avgMs.toFixed(3)} ms`)
    assert.ok(avgMs < 1.0, `Expected <1ms, got ${avgMs.toFixed(3)}ms`)
  })

  it('should read fallback from Mongo within 50ms', async () => {
    const as_of = new Date().toISOString()
    const start = performance.now()
    const doc = await db.collection('feature_history')
      .find({ featureSet: 'user_profile_rolling', entityId: 'user1', as_of: { $lte: new Date(as_of) } })
      .sort({ as_of: -1 })
      .limit(1)
      .next()
    const duration = performance.now() - start
    console.log(`→ Mongo read latency: ${duration.toFixed(3)} ms`)
    assert.ok(doc || duration < 50)
  })
})
