import React, { useState, useEffect } from "react";
import TextDisplay from "./components/TextDisplay";
import VisualDisplay from "./components/VisualDisplay";
import DataTable from "./components/DataTable";
import "./App.css";

function App() {
  const [altitude, setAltitude] = useState("");
  const [his, setHis] = useState("");
  const [adi, setAdi] = useState("");
  const [displayMode, setDisplayMode] = useState(""); // ברירת מחדל – כלום
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const a = Number(altitude);
    const h = Number(his);
    const ad = Number(adi);

    // בדיקות תקינות
    if (isNaN(a) || a < 0 || a > 3000) {
      alert("Altitude must be between 0 and 3000");
      return;
    }
    if (isNaN(h) || h < 0 || h > 360) {
      alert("HIS must be between 0 and 360");
      return;
    }
    if (isNaN(ad) || ad < -100 || ad > 100) {
      alert("ADI must be between -100 and 100");
      return;
    }

    const payload = { altitude: a, his: h, adi: ad };

    try {
      const res = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Data sent successfully");
        fetchData();
      } else {
        alert("Failed to send data");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/data");
      const json = await res.json();
      setData(json.reverse());
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Flight Monitor</h1>

      {/* כפתורים */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setDisplayMode(displayMode === "table" ? "" : "table")}>
          {displayMode === "table" ? "−" : "+"}
        </button>
        <button onClick={() => setDisplayMode("text")}>TEXT</button>
        <button onClick={() => setDisplayMode("visual")}>VISUAL</button>
      </div>

      {/* טופס קלט */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "80px", textAlign: "right" }}>Altitude:</label>
          <input
            type="number"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
            style={{ padding: "5px", width: "200px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "80px", textAlign: "right" }}>HIS:</label>
          <input
            type="number"
            value={his}
            onChange={(e) => setHis(e.target.value)}
            style={{ padding: "5px", width: "200px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ width: "80px", textAlign: "right" }}>ADI:</label>
          <input
            type="number"
            value={adi}
            onChange={(e) => setAdi(e.target.value)}
            style={{ padding: "5px", width: "200px" }}
          />
        </div>
        <button type="submit" style={{ padding: "6px 12px" }}>SEND</button>
      </form>

      {/* תצוגות לפי מצב */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", gap: "40px" }}>
        {displayMode === "table" && <DataTable data={data} />}
        {displayMode === "visual" && (
          <VisualDisplay altitude={Number(altitude)} his={Number(his)} adi={Number(adi)} />
        )}
        {displayMode === "text" && (
          <TextDisplay altitude={Number(altitude)} his={Number(his)} adi={Number(adi)} />
        )}
      </div>
    </div>
  );
}

export default App;
