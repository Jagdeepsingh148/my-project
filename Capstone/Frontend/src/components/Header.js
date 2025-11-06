import React from "react";

function Header() {
  return (
    <div style={{ marginBottom: "1rem", borderBottom: "2px solid #ccc" }}>
      <h1>⚡ Dynamic Feature Store Dashboard</h1>
      <p>Monitoring live feature updates from Kafka → Redis → Mongo</p>
    </div>
  );
}

export default Header;
