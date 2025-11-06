export function computeWatermark(eventTime, latenessMs) {
  const eventTs = new Date(eventTime).getTime()
  return new Date(eventTs - latenessMs)
}

export function cutoffTimestamp(windowDays) {
  const now = Date.now()
  return new Date(now - windowDays * 24 * 60 * 60 * 1000)
}

export function nowISO() {
  return new Date().toISOString()
}
