import fs from 'fs'

export async function loadFeatureDefinitions(db, filePath = './feature_definitions.json') {
  const localDefs = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : []
  const mongoDefs = await db.collection('feature_definitions').find({}).toArray()
  const allDefs = [...mongoDefs, ...localDefs]
  return allDefs.filter(d => d.active)
}
