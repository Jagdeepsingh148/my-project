// backend/src/main/routes/featureRoutes.js
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const { entityId, set } = req.query;

  if (!entityId || !set) {
    return res.status(400).json({ error: 'Missing entityId or set parameter' });
  }

  // Dummy static response (you’ll later replace this with Redis/Mongo logic)
  const features = [
    { name: 'rolling_avg_amount', value: 300, timestamp: new Date().toISOString() },
    { name: 'txn_count_7d', value: 15, timestamp: new Date().toISOString() },
  ];

  res.json({ entityId, set, features });
});

export default router;
