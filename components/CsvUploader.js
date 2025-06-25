'use client'
import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  const handleStoreToDB = async () => {
    if (csvData.length === 0) {
      alert("Upload CSV first!");
      return;
    }

    setLoading(true);
    try {
      
      for (const row of csvData) {
  if (!row.name || !row.email) {
    console.warn("Skipping invalid row:", row);
    continue; // ⛔ Skip rows with missing data
          

  }

  await fetch('/api/save-users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: row.name,
      email: row.email,
    }),
  });
}

      alert("Data stored in database!");
      console.log("Parsed CSV Data:", csvData);
    } catch (error) {
      console.error("Error saving to DB:", error);
      alert("Error storing data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* File Upload */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />

      {/* Table */}
      {csvData.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-emerald-950/70 text-white">
              <tr>
                {Object.keys(csvData[0]).map((header, index) => (
                  <th key={index} className="p-2 text-left border border-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="p-2 border border-gray-200 whitespace-nowrap">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-800 text-sm text-center">No CSV uploaded yet.</p>
      )}

      {/* Store Button */}
      <button
        onClick={handleStoreToDB}
        disabled={loading}
        className="mt-4 bg-emerald-950/70 text-white px-4 py-2 rounded hover:bg-emerald-900"
      >
        {loading ? "Storing to DB..." : "Store to Database"}
      </button>
    </div>
  );
};

export default CsvUploader;
