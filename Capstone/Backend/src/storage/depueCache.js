export async function isDuplicate(redis, eventId) {
  const key = `dedupe:${eventId}`
  const exists = await redis.exists(key)
  if (exists) return true
  await redis.set(key, '1', 'EX', 3600)
  return false
}
