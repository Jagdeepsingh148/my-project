import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Welcome to My Dockerized React App!</h1>
        <p>
          Built with using React, Docker, and GitHub Actions.
        </p>
        <button
          onClick={() => alert("Deployed with Automation!")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#61dafb",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            color: "#282c34",
          }}
        >
          Click Me 🚀
        </button>
      </header>
    </div>
  );
}

export default App;
