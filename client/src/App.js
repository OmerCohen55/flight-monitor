import React, { useState, useEffect } from "react";
import "./App.css";
import VisualDisplay from "./components/VisualDisplay";
import TextDisplay from "./components/TextDisplay";

/*
 * Component: App
 * Purpose: Main component of the Flight Monitor project.
 * Features:
 *  - Collects user input for Altitude, HIS, and ADI.
 *  - Displays either visual or text view based on user selection.
 *  - Stores and displays historical input values in a table.
 *  - Communicates with backend via REST API.
 */
function App() {
  // State variables for input fields
  const [altitude, setAltitude] = useState("");
  const [his, setHis] = useState("");
  const [adi, setAdi] = useState("");

  // Stores the fetched list of all previous readings
  const [data, setData] = useState([]);

  // Manages the current selected view: "TEXT", "VISUAL", or null
  const [view, setView] = useState(null);

  // Controls whether the input form is visible or hidden
  const [showForm, setShowForm] = useState(false);

  // Fetches data from the backend server (initial load)
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/data");
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Load data once when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  // Handles form submission and validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const altitudeVal = parseInt(altitude);
    const hisVal = parseInt(his);
    const adiVal = parseInt(adi);

    // Validate input values before sending
    if (altitudeVal < 0 || altitudeVal > 3000) {
      alert("Altitude must be between 0 and 3000");
      return;
    }
    if (hisVal < 0 || hisVal > 360) {
      alert("HIS must be between 0 and 360");
      return;
    }
    if (adiVal !== 0 && adiVal !== 100) {
      alert("ADI must be 0 or 100");
      return;
    }

    const newData = { altitude: altitudeVal, his: hisVal, adi: adiVal };

    // Send validated data to the backend
    try {
      const response = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        alert("Data sent successfully");
        fetchData(); // Refresh table data
        setAltitude("");
        setHis("");
        setAdi("");
      } else {
        alert("Failed to send data");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };

  return (
    <div className="App" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <h1>Flight Monitor</h1>

      {/* Control buttons: switch view and toggle form */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
        <button onClick={() => setView("TEXT")}>TEXT</button>
        <button onClick={() => setView("VISUAL")}>VISUAL</button>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "–" : "+"}
        </button>
      </div>

      {/* Input form – shown only when form is toggled open */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>Altitude:</label>
            <input
              type="number"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
              placeholder="0 - 3000"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>HIS:</label>
            <input
              type="number"
              value={his}
              onChange={(e) => setHis(e.target.value)}
              placeholder="0 - 360"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>ADI:</label>
            <input
              type="number"
              value={adi}
              onChange={(e) => setAdi(e.target.value)}
              placeholder="100 - (100-)"
            />
          </div>
          <button type="submit">SEND</button>
        </form>
      )}

      {/* Conditional display: Visual or Text view based on selection */}
      {view === "VISUAL" && data.length > 0 && (
        <VisualDisplay
          altitude={data[data.length - 1].altitude}
          his={data[data.length - 1].his}
          adi={data[data.length - 1].adi}
        />
      )}
      {view === "TEXT" && data.length > 0 && (
        <TextDisplay
          altitude={data[data.length - 1].altitude}
          his={data[data.length - 1].his}
          adi={data[data.length - 1].adi}
        />
      )}

      {/* Always visible: Table of previous readings */}
      <h2 style={{ marginTop: "40px" }}>Previous Readings</h2>
      <table style={{ margin: "0 auto", borderCollapse: "collapse", minWidth: "300px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "6px" }}>Altitude</th>
            <th style={{ border: "1px solid black", padding: "6px" }}>HIS</th>
            <th style={{ border: "1px solid black", padding: "6px" }}>ADI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "6px" }}>{entry.altitude}</td>
              <td style={{ border: "1px solid black", padding: "6px" }}>{entry.his}</td>
              <td style={{ border: "1px solid black", padding: "6px" }}>{entry.adi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
