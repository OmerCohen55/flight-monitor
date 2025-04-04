import React from "react";

const DataTable = ({ data }) => {
  if (!Array.isArray(data)) {
    return <p>No data available</p>; // הגנה על מקרים נדירים
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
