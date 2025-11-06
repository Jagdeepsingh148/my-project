import { Kafka } from 'kafkajs'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'

async function seed() {
  const kafka = new Kafka({ brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',') })
  const producer = kafka.producer()
  await producer.connect()
  const topic = process.env.KAFKA_TOPIC || 'events'
  const now = Date.now()
  for (let i = 0; i < 50; i++) {
    const ev = {
      eventId: uuidv4(),
      entityId: `user${(i%5)+1}`,
      eventTime: new Date(now - (i * 60 * 1000)).toISOString(),
      payload: { amount: Math.round(Math.random() * 200) }
    }
    await producer.send({ topic, messages: [{ value: JSON.stringify(ev) }] })
  }
  await producer.disconnect()
  console.log('seeded events')
}

seed().catch(e => { console.error(e); process.exit(1) })
