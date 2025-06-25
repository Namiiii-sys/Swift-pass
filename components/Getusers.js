'use client';

import React, { useEffect, useState } from 'react';

const ParticipantsTable = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await fetch('/api/get-users'); // 
        const data = await response.json();
        setParticipants(data); 
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    getusers();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Participants</h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-emerald-950/70 text-white">
            <tr>
              {participants[0] &&
                Object.keys(participants[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                {Object.values(p).map((val, idx) => (
                  <td key={idx} className="p-2 border">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
            {participants.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={100}>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsTable;
