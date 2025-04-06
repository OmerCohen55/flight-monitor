import React from "react";

/*
 * Component: DataTable
 * Purpose: Displays a table with the history of Altitude, HIS, and ADI values.
 * Props: 
 *    - data: An array of objects containing altitude, his, and adi values.
 */
const DataTable = ({ data }) => {
  // Checks if 'data' is in the correct format (array). If not, shows a message saying no data is available.
  if (!Array.isArray(data)) {
    return <p>No data available</p>; // message if data is invalid
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
        {/* Iterate through the 'data' array and create a row for each entry */}
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
