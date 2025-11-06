export async function getPointInTimeFeature(db, featureSet, entityId, as_of) {
  return await db.collection('feature_history')
    .find({ featureSet, entityId, as_of: { $lte: new Date(as_of) } })
    .sort({ as_of: -1 })
    .limit(1)
    .next()
}
