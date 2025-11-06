export const REDIS_KEY_PATTERN = (featureSet, version, entityId) =>
  `fs:${featureSet}:v${version}:entity:${entityId}`

export const STATE_KEY_PATTERN = (featureSet, entityId) =>
  `state:${featureSet}:entity:${entityId}`

export const DEFAULT_TTL = 86400
