'use client'
import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvTable = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true, 
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, .xls"
        onChange={handleFileUpload}
        className="border p-2 rounded w-full mb-2"
      />

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-950/70">
            <tr>
              {csvData.length > 0 &&
                Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} className="p-2 text-left border-1 border-gray-600">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="p-3">{value}</td>
                ))}
              </tr>
            ))}
            {csvData.length === 0 && (
              <tr>
                <td colSpan="100%" className="p-3 text-center text-gray-500">
                  No CSV data uploaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvTable;
