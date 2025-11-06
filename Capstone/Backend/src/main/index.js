import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dashboardRouter from './routes/dashboard.js';
import featureRoutes from '../api/routes/featureRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = 'mongodb://localhost:27017/featurestore';
const app = express();

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/', dashboardRouter);
app.use('/features', featureRoutes); // <— this enables /features POST + GET

// ✅ Health Check
app.get('/health', (req, res) => {
  res.send({ status: 'Feature Store Running ✅' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Feature Store API running on port ${PORT}`);
});
