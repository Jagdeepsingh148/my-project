import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: Number(process.env.PORT || 3000),
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  kafkaTopic: process.env.KAFKA_TOPIC || 'events',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
  mongoDb: process.env.MONGO_DB || 'featurestore',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  allowedLatenessMs: Number(process.env.ALLOWED_LATENESS_MS || 120000),
  featureTtl: Number(process.env.FEATURE_TTL_SECONDS || 86400),
  freshnessSla: Number(process.env.FRESHNESS_SLA_SECONDS || 300),
  logLevel: process.env.LOG_LEVEL || 'info'
}
