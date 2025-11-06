import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function FeatureChart({ data }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>📈 Feature Trends (Last Events)</h2>
      <LineChart width={700} height={300} data={data}>
        <Line type="monotone" dataKey="payload.amount" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="eventTime" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default FeatureChart;
