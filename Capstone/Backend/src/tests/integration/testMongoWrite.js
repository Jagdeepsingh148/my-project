import { strict as assert } from 'assert'
import { MongoClient } from 'mongodb'

describe('Mongo Write Operations', () => {
  let db, client

  before(async () => {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    db = client.db('test_featurestore')
  })

  after(async () => {
    await client.close()
  })

  it('should insert event into Mongo', async () => {
    const events = db.collection('events')
    const doc = { eventId: 'evt123', entityId: 'u1', eventTime: new Date(), payload: { amount: 100 } }
    const result = await events.insertOne(doc)
    assert.ok(result.insertedId)
  })

  it('should upsert feature history', async () => {
    const hist = db.collection('feature_history')
    const feature = {
      featureSet: 'user_profile',
      featureName: 'spend',
      entityId: 'u1',
      as_of: new Date(),
      value: { sum: 250 },
      computed_at: new Date()
    }
    await hist.updateOne(
      { featureSet: feature.featureSet, entityId: feature.entityId },
      { $set: feature },
      { upsert: true }
    )
    const fetched = await hist.findOne({ entityId: 'u1' })
    assert.equal(fetched.value.sum, 250)
  })
})
