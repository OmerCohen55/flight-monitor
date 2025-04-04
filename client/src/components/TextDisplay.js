import React from 'react';

/*
 * Component: TextDisplay
 * Purpose: Shows the current values of Altitude, HIS, and ADI as plain text.
 * Notes: This component is used as the textual representation of the input data.
 * Props:
 *    - altitude: Number representing the altitude value
 *    - his: Number representing the horizontal situation indicator
 *    - adi: Number representing the attitude direction indicator
 */
const TextDisplay = ({ altitude, his, adi }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Text View</h2>
      {/* Display each value in a separate line */}
      <p>Altitude: {altitude}</p>
      <p>HIS: {his}</p>
      <p>ADI: {adi}</p>
    </div>
  );
};

export default TextDisplay;
