import express from 'express'
import { metricsController } from '../controllers/metricsController.js'

export function MetricsRouter() {
  const router = express.Router()
  const controller = metricsController()
  router.get('/', controller.getMetrics)
  return router
}
