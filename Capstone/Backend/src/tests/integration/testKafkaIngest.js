import { strict as assert } from 'assert'
import Redis from 'ioredis-mock'
import { MongoClient } from 'mongodb'
import { processEvent } from '../../kafka/eventHandler.js'

describe('Kafka Ingest Integration', () => {
  let db, redis

  before(async () => {
    redis = new Redis()
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    db = client.db('test_featurestore')
    await db.collection('feature_definitions').insertOne({
      featureSet: 'user_profile_rolling',
      featureName: 'user_7d_spend',
      version: 1,
      active: true,
      aggregation: { window_ms: 10000000, agg_name: 'sum' }
    })
  })

  it('writes event and feature history', async () => {
    const event = { eventId: 'e1', entityId: 'userX', eventTime: new Date().toISOString(), payload: { amount: 200 } }
    await processEvent({ event, redis, db, logger: console, metrics: { ingestCounter: { inc: () => {} } } })
    const doc = await db.collection('events').findOne({ eventId: 'e1' })
    assert.ok(doc)
  })
})
