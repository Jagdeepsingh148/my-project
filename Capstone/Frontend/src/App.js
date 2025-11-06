import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FaMoneyBillWave, 
  FaShoppingCart, 
  FaRedoAlt, 
  FaChartLine, 
  FaUsers, 
  FaClock 
} from 'react-icons/fa';
import './App.css';

const iconMap = {
  'rolling_avg_amount': <FaMoneyBillWave size={32} color="#4cd137" />,
  'txn_count_7d': <FaUsers size={32} color="#00a8ff" />,
  'avg_session_duration': <FaClock size={32} color="#fbc531" />,
  'cart_abandon_rate': <FaShoppingCart size={32} color="#e84118" />,
  'conversion_rate': <FaChartLine size={32} color="#9c88ff" />,
  'refund_ratio': <FaRedoAlt size={32} color="#c23616" />,
};


function App() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/features?entityId=user1&set=user_profile_rolling');
        setFeatures(res.data.features);
      } catch (err) {
        console.error('Error fetching features:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading data...</div>;

  return (
    <div className="app-container">
      <header>
        <h1>🔥 Dynamic Feature Store Dashboard</h1>
        <p>Live computed features from <strong>Kafka → Redis → Mongo</strong></p>
      </header>

       <div className="cards-container">
  {features.map((f, idx) => (
    <div className="feature-card" key={idx}>
      <div className="icon">{iconMap[f.name] || <FaChartLine size={32} color="#fff" />}</div>
      <h2>{f.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
      <p className="value">{f.value}</p>
      <p className="timestamp">
        Last updated: {new Date(f.timestamp).toLocaleString()}
      </p>
      <div className={`status ${Date.now() - new Date(f.timestamp).getTime() < 60000 ? 'fresh' : 'stale'}`}>
        {Date.now() - new Date(f.timestamp).getTime() < 60000 ? '🟢 Fresh' : '🟠 Stale'}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default App;
