import express from 'express'
import { healthControllerFactory } from '../controllers/healthController.js'

export function HealthRouter({ redis, db }) {
  const router = express.Router()
  const controller = healthControllerFactory({ redis, db })
  router.get('/', controller.getHealth)
  return router
}
