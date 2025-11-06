import React from "react";

function FeatureTable({ data }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🧾 Feature Event Log</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>Event ID</th>
            <th>Entity</th>
            <th>Amount</th>
            <th>Event Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.eventId}</td>
              <td>{row.entityId}</td>
              <td>{row.payload?.amount}</td>
              <td>{row.eventTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeatureTable;
