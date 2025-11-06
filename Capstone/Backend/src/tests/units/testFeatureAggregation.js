import { strict as assert } from 'assert'
import { updateAggregate } from '../../features/aggregator.js'
import Redis from 'ioredis-mock'

describe('Feature Aggregation', () => {
  const redis = new Redis()
  const def = {
    featureSet: 'user_profile_rolling',
    featureName: 'user_7d_spend',
    version: 1,
    ttl_seconds: 60,
    aggregation: { window_ms: 7 * 24 * 3600 * 1000, agg_name: 'sum' }
  }

  it('computes rolling sum correctly', async () => {
    const event = { entityId: 'user1', eventTime: new Date().toISOString(), payload: { amount: 100 } }
    const r = await updateAggregate({ def, event, redis })
    assert.equal(typeof r.value.sum, 'number')
    assert.ok(r.value.sum >= 100)
  })
})
