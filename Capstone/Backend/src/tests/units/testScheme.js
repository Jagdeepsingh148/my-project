import { strict as assert } from 'assert'
import { featureDefSchema } from '../../storage/schemas/featureDefSchema.js'

describe('Feature Definition Schema', () => {
  it('has required fields', () => {
    const keys = Object.keys(featureDefSchema)
    assert(keys.includes('featureSet'))
    assert(keys.includes('aggregation'))
    assert(keys.includes('active'))
  })
})
