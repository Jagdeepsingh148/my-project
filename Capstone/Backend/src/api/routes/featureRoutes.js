import express from 'express';

console.log("✅ Loaded featureRoutes.js from:", import.meta.url);

const router = express.Router();

// In-memory list (resets on restart)
let features = [
  { name: 'rolling_avg_amount', value: 300, timestamp: new Date().toISOString() },
  { name: 'txn_count_7d', value: 15, timestamp: new Date().toISOString() },
  { name: 'avg_session_duration', value: 12.4, timestamp: new Date().toISOString() },
  { name: 'cart_abandon_rate', value: 8.2, timestamp: new Date().toISOString() },
  { name: 'conversion_rate', value: 3.6, timestamp: new Date().toISOString() },
  { name: 'refund_ratio', value: 0.4, timestamp: new Date().toISOString() },
];

// ✅ GET route
router.get('/', (req, res) => {
  const { entityId, set } = req.query;
  res.json({
    entityId: entityId || 'demo-user',
    set: set || 'user_profile_rolling',
    features,
  });
});

// ✅ POST route
router.post('/', (req, res) => {
  const { name, value } = req.body;

  if (!name || value === undefined) {
    return res.status(400).json({ error: 'Both "name" and "value" are required.' });
  }

  const newFeature = {
    name,
    value,
    timestamp: new Date().toISOString(),
  };

  features.push(newFeature);
  console.log("🆕 Added new feature:", newFeature);

  res.status(201).json({ message: 'Feature added successfully', feature: newFeature });
});

export default router;
