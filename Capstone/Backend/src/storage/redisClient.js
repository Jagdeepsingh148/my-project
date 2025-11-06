import Redis from 'ioredis'

export function createRedisClient(url) {
  const r = new Redis(url)
  r.on('error', () => {})
  return r
}
