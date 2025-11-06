export function healthControllerFactory({ redis, db }) {
  async function getHealth(req, res) {
    const redisOk = redis.status === 'ready'
    const mongoOk = !!(db && (await db.stats()))
    const status = redisOk && mongoOk ? 'ok' : 'degraded'
    res.send({ status, redis: redis.status, mongo: mongoOk })
  }
  return { getHealth }
}
