import express from 'express'
import { createClient } from 'redis'

const router = express.Router()
const redis = createClient({ url: process.env.REDIS_URL })
await redis.connect()

router.get('/dashboard', async (req, res) => {
  const keys = await redis.keys('fs:*')
  const features = []
  for (const key of keys) {
    const value = await redis.get(key)
    features.push({ key, value: JSON.parse(value) })
  }
  res.send(`
    <html>
      <head><title>Feature Dashboard</title></head>
      <body>
        <h1>Feature Store Dashboard</h1>
        <ul>
          ${features.map(f => `<li><b>${f.key}</b>: ${JSON.stringify(f.value)}</li>`).join('')}
        </ul>
      </body>
    </html>
  `)
})

export default router
