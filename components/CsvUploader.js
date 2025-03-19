'use client'
import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
        },
      });
    }
  };

  // Send Emails to API
  const handleSendEmails = async () => {
    if (csvData.length === 0) {
      alert("Please upload a CSV file first!");
      return;
    }

    setLoading(true);

    try {
      for (const row of csvData) {
        const emailData = {
          email: row.email,
          subject: row.subject || "Default Subject",
          message: row.message || "Default Message",
        };

        const response = await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error(`Failed to send email to ${row.email}:`, data.error);
        } else {
          console.log(`Email sent successfully to ${row.email}`);
        }
      }

      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Error sending emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* File Upload */}
      <input
        type="file"
        accept=".csv, .xls"
        onChange={handleFileUpload}
        className="border p-2 rounded w-full mb-2"
      />

      {/* CSV Table */}
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

      {/* Send Emails Button */}
      <button
        onClick={handleSendEmails}
        disabled={loading}
        className="mt-4 bg-emerald-950/70 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending Emails..." : "Send Emails"}
      </button>
    </div>
  );
};

export default CsvUploader;
