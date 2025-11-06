import { Kafka } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid'

export async function produceEvents(topic = 'events', count = 10, brokers = ['localhost:9092']) {
  const kafka = new Kafka({ brokers })
  const producer = kafka.producer()
  await producer.connect()

  for (let i = 0; i < count; i++) {
    const event = {
      eventId: uuidv4(),
      entityId: `user${(i % 3) + 1}`,
      eventTime: new Date().toISOString(),
      payload: { amount: Math.floor(Math.random() * 200) }
    }
    await producer.send({ topic, messages: [{ value: JSON.stringify(event) }] })
  }

  await producer.disconnect()
  console.log(`${count} events sent to topic ${topic}`)
}
