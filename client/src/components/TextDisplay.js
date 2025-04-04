import React from 'react';

const TextDisplay = ({ altitude, his, adi }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Text View</h2>
      <p>Altitude: {altitude}</p>
      <p>HIS: {his}</p>
      <p>ADI: {adi}</p>
    </div>
  );
};

export default TextDisplay;
