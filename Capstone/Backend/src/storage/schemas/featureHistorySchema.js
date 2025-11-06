export const featureHistorySchema = {
  featureSet: String,
  featureName: String,
  version: Number,
  entityId: String,
  as_of: Date,
  value: Object,
  computed_at: Date
}
