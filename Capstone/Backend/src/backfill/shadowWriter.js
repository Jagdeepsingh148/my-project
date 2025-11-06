export async function writeShadowFeature(redis, def, entityId, value) {
  const key = `shadow:fs:${def.featureSet}:v${def.version}:entity:${entityId}`
  await redis.set(key, JSON.stringify(value), 'EX', def.ttl_seconds || 86400)
}

export async function promoteShadow(redis, def) {
  const keys = await redis.keys(`shadow:fs:${def.featureSet}:v${def.version}:entity:*`)
  for (const oldKey of keys) {
    const newKey = oldKey.replace('shadow:', '')
    const val = await redis.get(oldKey)
    if (val) await redis.set(newKey, val, 'EX', def.ttl_seconds || 86400)
  }
  console.log(`Promoted shadow features for ${def.featureSet}`)
}
