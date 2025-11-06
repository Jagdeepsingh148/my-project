import { Kafka } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid'

export async function seedKafka(topic = 'events', count = 10) {
  const kafka = new Kafka({ brokers: ['localhost:9092'] })
  const producer = kafka.producer()
  await producer.connect()
  for (let i = 0; i < count; i++) {
    const event = {
      eventId: uuidv4(),
      entityId: `user${(i % 3) + 1}`,
      eventTime: new Date().toISOString(),
      payload: { amount: Math.round(Math.random() * 100) }
    }
    await producer.send({ topic, messages: [{ value: JSON.stringify(event) }] })
  }
  await producer.disconnect()
}
