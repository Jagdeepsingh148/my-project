import { updateAggregate } from './aggregator.js'

export async function recomputeFeature({ def, events, redis, db }) {
  for (const event of events) {
    await updateAggregate({ def, event, redis })
    await db.collection('feature_history').updateOne(
      { featureSet: def.featureSet, entityId: event.entityId, as_of: new Date(event.eventTime) },
      { $set: { version: def.version, recomputed_at: new Date() } },
      { upsert: true }
    )
  }
}
