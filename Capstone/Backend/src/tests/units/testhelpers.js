import { strict as assert } from 'assert'
import { nowISO, cutoffTimestamp, computeWatermark } from '../../utils/helpers.js'

describe('Helper Utilities', () => {
  it('should return ISO timestamp format', () => {
    const iso = nowISO()
    assert.ok(iso.includes('T'))
  })

  it('should compute cutoff timestamp less than now', () => {
    const cutoff = cutoffTimestamp(1)
    assert.ok(cutoff.getTime() < Date.now())
  })

  it('should compute watermark correctly', () => {
    const now = new Date().toISOString()
    const watermark = computeWatermark(now, 60000)
    const diff = Date.now() - watermark.getTime()
    assert.ok(diff >= 60000 - 1000)
  })
})
