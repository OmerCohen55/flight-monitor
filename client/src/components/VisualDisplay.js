import React from "react";

/*
 * Component: VisualDisplay
 * Purpose: Visually displays flight indicators – Altitude, HIS (compass), and ADI.
 * Notes:
 * - ADI is shown as a colored circle (blue, green, gray).
 * - HIS is displayed as a rotating compass needle.
 * - Altitude is shown as a vertical gauge with a horizontal arrow.
 * Props:
 *   - altitude: Number (0–3000), affects arrow position on altitude bar
 *   - his: Number (degrees), affects rotation of compass needle
 *   - adi: Number (0–100), determines ADI color
 */
const VisualDisplay = ({ altitude, his, adi }) => {
  // Returns the ADI color based on the value (blue = max, green = zero, gray = other)
  const getAdiColor = () => {
    if (adi == 100) return "blue";
    if (adi == 0) return "green";
    return "gray";
  };

  // Calculate arrow position within the 300px height scale based on altitude (max 3000)
  const arrowPosition = 300 - (altitude / 3000) * 300;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", gap: "60px" }}>
      
      {/* ADI Indicator – Circle changing color based on ADI value */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: getAdiColor(),
          border: "1px solid black",
        }}
      />

      {/* HIS Indicator – Compass with rotating needle */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "1px solid black",
          position: "relative",
        }}
      >
        {/* Orange needle representing heading, rotated based on 'his' value */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 60,
            backgroundColor: "orange",
            transform: `translate(-50%, -100%) rotate(${his}deg)`,
            transformOrigin: "bottom center",
          }}
        />
        {/* Compass direction labels */}
        <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)" }}>N</div>
        <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)" }}>S</div>
        <div style={{ position: "absolute", top: "50%", left: 2, transform: "translateY(-50%)" }}>W</div>
        <div style={{ position: "absolute", top: "50%", right: 2, transform: "translateY(-50%)" }}>E</div>
      </div>

      {/* Altitude Indicator – Vertical gauge with horizontal arrow */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div
          style={{
            width: 50,
            height: 300,
            border: "1px solid black",
            position: "relative",
          }}
        >
          {/* Horizontal arrow showing the current altitude, only if within valid range */}
          {altitude >= 0 && altitude <= 3000 && (
            <div
              style={{
                position: "absolute",
                top: `${arrowPosition}px`,
                left: "-10px",
                width: "70px",
                height: "2px",
                backgroundColor: "blue",
              }}
            />
          )}
        </div>

        {/* Altitude scale labels */}
        <div style={{ height: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span>3000</span>
          <span>2000</span>
          <span>1000</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default VisualDisplay;
