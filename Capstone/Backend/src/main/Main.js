import express from 'express'
import rateLimit from 'express-rate-limit'
import client from 'prom-client'
import { Kafka } from 'kafkajs'
import { createRedisClient } from '../storage/redisClient.js'
import { createMongoClient } from '../storage/mongoClient.js'
import { FeatureRoutes } from '../api/routes/featureRoutes.js'
import { HealthRouter } from '../api/routes/healthRoutes.js'
import { MetricsRouter } from '../api/routes/metricsRoutes.js'
import { startConsumer } from '../kafka/consumer.js'
import { config } from './config.js'
import { logger } from './logger.js'
import { Metrics } from './metrics.js'
import { errorHandler } from '../utils/errorHandler.js'

export class Main {
  constructor() {
    this.app = express()
    this.metrics = new Metrics()
    this.logger = logger
    this.redis = null
    this.mongoClient = null
    this.db = null
  }

  async start() {
    try {
      // Initialize Redis and Mongo
      this.redis = createRedisClient(config.redisUrl)
      this.mongoClient = await createMongoClient(config.mongoUrl)
      this.db = this.mongoClient.db(config.mongoDb)

      // Initialize Kafka consumer
      await this.setupKafkaConsumer()

      // Setup Express routes and middleware
      this.setupExpress()

      // Ensure indexes
      await this.ensureIndexes()

      // Start Express server
      this.server = this.app.listen(config.port, () => {
        this.logger.info(`🚀 Feature Store API running on port ${config.port}`)
      })
    } catch (err) {
      this.logger.error({ err }, '❌ Startup failure')
      process.exit(1)
    }
  }

  async setupKafkaConsumer() {
    try {
      await startConsumer({
        brokers: config.kafkaBrokers,
        topic: config.kafkaTopic,
        redis: this.redis,
        db: this.db,
        logger: this.logger,
        metrics: this.metrics
      })
      this.logger.info('✅ Kafka consumer started successfully')
    } catch (err) {
      this.logger.error({ err }, '⚠️ Failed to start Kafka consumer')
    }
  }

  setupExpress() {
    this.app.use(express.json())

    // Rate Limiting
    this.app.use(rateLimit({
      windowMs: 1000,
      max: 50,
      message: { error: 'Too many requests, please slow down.' }
    }))

    // Static Dashboard (optional)
    this.app.use(express.static('public'))

    // Routers
    this.app.use('/features', FeatureRoutes({
      redis: this.redis,
      db: this.db,
      logger: this.logger,
      metrics: this.metrics,
      secret: config.jwtSecret
    }))
    this.app.use('/health', HealthRouter({ redis: this.redis, db: this.db }))
    this.app.use('/metrics', MetricsRouter())

    // Prometheus metrics
    this.app.get('/metrics', async (req, res) => {
      res.set('Content-Type', client.register.contentType)
      res.end(await client.register.metrics())
    })

    // Root message
    this.app.get('/', (req, res) => {
      res.send({
        message: 'Dynamic Feature Store API is running',
        services: ['/features', '/health', '/metrics']
      })
    })

    // Global error handler
    this.app.use(errorHandler(this.logger))
  }

  async ensureIndexes() {
    try {
      await this.db.collection('events').createIndex({ eventId: 1 }, { unique: true })
      await this.db.collection('feature_history').createIndex(
        { featureSet: 1, featureName: 1, entityId: 1, as_of: 1 },
        { unique: true }
      )
      this.logger.info('📚 Mongo indexes ensured')
    } catch (err) {
      this.logger.error({ err }, 'Failed to create indexes')
    }
  }
}
