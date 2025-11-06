import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

function windowCutoffTs(windowMs, nowTs) {
  return nowTs - windowMs
}

export async function updateAggregate({ def, event, redis }) {
  const windowSize = def.aggregation.window_ms || 7 * 24 * 3600 * 1000
  const stateKey = `state:${def.featureSet}:entity:${event.entityId}`
  const featureKey = `fs:${def.featureSet}:v${def.version}:entity:${event.entityId}`
  const stateRaw = await redis.get(stateKey)
  let state = stateRaw ? JSON.parse(stateRaw) : { window: [] }
  state.window.push({ t: event.eventTime, v: event.payload?.amount || 0 })
  const cutoff = windowCutoffTs(windowSize, Date.now())
  state.window = state.window.filter(x => new Date(x.t).getTime() >= cutoff)
  const sum = state.window.reduce((s, x) => s + x.v, 0)
  const payload = { value: { [def.aggregation.agg_name || 'sum']: sum }, computed_at: new Date().toISOString(), as_of: event.eventTime, etag: uuidv4() }
  const ex = def.ttl_seconds || 86400
  const multi = redis.multi()
  multi.set(featureKey, JSON.stringify(payload), 'EX', ex)
  multi.set(stateKey, JSON.stringify(state), 'EX', Math.max(60, ex))
  await multi.exec()
  return { value: payload.value }
}
