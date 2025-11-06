import request from 'supertest'
import express from 'express'
import Redis from 'ioredis-mock'
import { FeatureRouter } from '../../main/routes.js'
import { MongoClient } from 'mongodb'

describe('Feature Read API', () => {
  let app, db, redis

  before(async () => {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    db = client.db('test_featurestore')
    redis = new Redis()
    app = express()
    app.use('/features', FeatureRouter({ redis, db, logger: console, metrics: { readLatency: { observe: () => {} } } }))
  })

  it('returns 404 when no data', async () => {
    await request(app).get('/features?entityId=x&set=test').expect(404)
  })
})
