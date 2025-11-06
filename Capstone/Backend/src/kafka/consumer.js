import { Kafka } from 'kafkajs'
import { processEvent } from './eventHandler.js'

export async function startConsumer({ brokers, topic, redis, db, logger, metrics }) {
  const kafka = new Kafka({ brokers })
  const consumer = kafka.consumer({ groupId: 'fs-ingest-group' })
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: false })
  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
      for (const message of batch.messages) {
        const raw = message.value.toString()
        let event
        try {
          event = JSON.parse(raw)
        } catch (e) {
          logger.error({ msg: 'invalid json', raw })
          resolveOffset(message.offset)
          continue
        }
        try {
          await processEvent({ event, redis, db, logger, metrics })
          metrics.ingestCounter.inc()
          resolveOffset(message.offset)
        } catch (e) {
          logger.error({ err: e, event })
        }
      }
      await commitOffsetsIfNecessary()
      await heartbeat()
    }
  })
}
