import { MongoClient } from 'mongodb'

export async function createMongoClient(mongoUrl) {
  const client = new MongoClient(mongoUrl)
  await client.connect()
  return client
}
