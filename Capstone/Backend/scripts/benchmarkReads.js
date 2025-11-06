import Redis from 'ioredis'
const redis = new Redis('redis://127.0.0.1:6379')

async function benchmark(n = 1000) {
  const key = 'fs:user_profile_rolling:v1:entity:user1'
  await redis.set(key, JSON.stringify({ value: { sum: 100 } }))
  const start = Date.now()
  for (let i = 0; i < n; i++) await redis.get(key)
  const ms = (Date.now() - start) / n
  console.log(`Avg read latency: ${ms.toFixed(3)} ms`)
  process.exit(0)
}

benchmark()
