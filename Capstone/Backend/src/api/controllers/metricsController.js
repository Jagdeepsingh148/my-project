import client from 'prom-client'

export function metricsController() {
  async function getMetrics(req, res) {
    res.set('Content-Type', client.register.contentType)
    res.end(await client.register.metrics())
  }
  return { getMetrics }
}
