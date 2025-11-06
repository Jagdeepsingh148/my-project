import { Kafka } from 'kafkajs'

export async function createKafkaTopic(topicName, brokers) {
  const kafka = new Kafka({ brokers })
  const admin = kafka.admin()
  await admin.connect()
  const topics = await admin.listTopics()
  if (!topics.includes(topicName)) {
    await admin.createTopics({
      topics: [{ topic: topicName, numPartitions: 3, replicationFactor: 1 }]
    })
    console.log(`Created topic: ${topicName}`)
  } else {
    console.log(`Topic already exists: ${topicName}`)
  }
  await admin.disconnect()
}
