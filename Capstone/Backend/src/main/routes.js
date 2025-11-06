import express from 'express'
import { featureControllerFactory } from '../api/controllers/featureController.js'

export function FeatureRouter({ redis, db, logger, metrics }) {
  const router = express.Router()
  const controller = featureControllerFactory({ redis, db, logger, metrics })
  router.get('/', controller.getFeatures)
  router.get('/batch', controller.getFeaturesBatch)
  return router
}
