import React from "react";

const VisualDisplay = ({ altitude, his, adi }) => {
  const getAdiColor = () => {
    if (adi >= 0 && adi <= 100) return "blue";
    if (adi < 0 && adi >= -100) return "green";
    return "gray";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", gap: "60px" }}>
      {/* עיגול ADI */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: getAdiColor(),
          border: "1px solid black",
        }}
      />

      {/* מצפן HIS */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "1px solid black",
          position: "relative",
        }}
      >
        {/* חץ מסתובב מהמרכז */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 60,
            backgroundColor: "black",
            transform: `translate(-50%, -100%) rotate(${his}deg)`,
            transformOrigin: "bottom center",
          }}
        />
        {/* סימוני כיוונים */}
        <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)" }}>N</div>
        <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)" }}>S</div>
        <div style={{ position: "absolute", top: "50%", left: 2, transform: "translateY(-50%)" }}>W</div>
        <div style={{ position: "absolute", top: "50%", right: 2, transform: "translateY(-50%)" }}>E</div>
      </div>

      {/* מחוון Altitude אנכי */}
      <div
        style={{
          width: 50,
          height: 300,
          border: "1px solid black",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${(altitude / 3000) * 100}%`,
            backgroundColor: "black",
          }}
        />
      </div>
    </div>
  );
};

export default VisualDisplay;
