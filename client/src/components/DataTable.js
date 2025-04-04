import React from "react";

/*
 * Component: DataTable
 * Purpose: Displays a simple table showing the history of input values 
 *          for the Altitude, HIS, and ADI indicators.
 * Notes: Used in the "Flight Monitor" project (IAF).
 * Props:
 *    - data: Array of objects, each containing altitude, his, and adi values.
 */
const DataTable = ({ data }) => {
  // Defensive check to handle unexpected data formats
  if (!Array.isArray(data)) {
    return <p>No data available</p>; // Fallback message if data is invalid
  }

  return (
    <table border="1" style={{ borderCollapse: "collapse", minWidth: "300px" }}>
      <thead>
        <tr>
          <th>Altitude</th>
          <th>HIS</th>
          <th>ADI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            {/* Display each data entry in a new row */}
            <td>{entry.altitude}</td>
            <td>{entry.his}</td>
            <td>{entry.adi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
