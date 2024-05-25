import React from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <div>No data available</div>;

  const headers = Object.keys(data[0]);

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
