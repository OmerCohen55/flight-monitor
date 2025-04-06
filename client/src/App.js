import React, { useState, useEffect } from "react"; // Import React to manage state
import "./App.css"; // Import the CSS file for styling the App 
import VisualDisplay from "./components/VisualDisplay"; // Import the VisualDisplay component to show data visually
import TextDisplay from "./components/TextDisplay"; // Import the TextDisplay component to show data in text format

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
  // 'altitude' contains the altitude input from the user, 'setAltitude' is the function to update it
  const [altitude, setAltitude] = useState("");
  const [his, setHis] = useState("");
  const [adi, setAdi] = useState("");

  // 'data' stores the flight data from the server
  const [data, setData] = useState([]); // Holds all fetched data. 'setData' updates it.

  // 'view' manages the selected display mode: "TEXT", "VISUAL", or null
  const [view, setView] = useState(null); // Holds the display mode. 'setView' changes it.

  // 'showForm' controls if the input form is visible or not
  const [showForm, setShowForm] = useState(false); 

// This function fetches the flight data from the server when called
const fetchData = async () => {
  try {
    // Sending a GET request to the server to fetch the flight data
    const response = await fetch("http://localhost:3001/api/data");

    // Waiting for the server's response and changing it to JSON format - present it in a friendlier way
    const json = await response.json();

    // Updating the 'data' state with the fetched data (flight data)
    setData(json);
  } catch (err) {
    // If an error occurs during the data fetching process, log it in the console
    console.error("Error fetching data:", err);
  }
};

  // Load data once when the component is loaded
  useEffect(() => {
    fetchData(); // Calls fetchData to get data from the server
  }, []);

  // Handles form submission and input validation
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Converts input values to numbers
    const altitudeVal = parseInt(altitude);
    const hisVal = parseInt(his);
    const adiVal = parseInt(adi);

    // Validates input values
    if (altitudeVal < 0 || altitudeVal > 3000) {
      alert("Altitude must be between 0 and 3000");
      return;
    }
    if (hisVal < 0 || hisVal > 360) {
      alert("HIS must be between 0 and 360");
      return;
    }
    if (adiVal < -100 && adiVal > 100) {
      alert("ADI must be between -100 and 100");
      return;
    }

    // Check if any field is empty (not filled by the user)
    if (altitude === "" || his === "" || adi === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Creates an object with the validated data
    const newData = { altitude: altitudeVal, his: hisVal, adi: adiVal };

    // Sends the data to the backend
    try {
      const response = await fetch("http://localhost:3001/api/data", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        alert("Data sent successfully");
        fetchData(); // Refreshes data
        setAltitude(""); setHis(""); setAdi(""); // Resets input fields
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

      {/* Input form – shown only when form is changed open */}
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

      {/* Display data based on the selected view: Visual or Text */}
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
          {/* Iterates over each entry in the 'data' array, 
          which was fetched from the backend (MongoDB), and displays it in a table row */}
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
