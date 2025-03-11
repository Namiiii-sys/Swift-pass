'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import backarrow from '@/public/backarrow.svg'
import { Plus, FolderOpen, Mail, QrCode, Upload } from "lucide-react";

function Page() {
  const [view, setView] = useState("dashboard");
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const fileData = uploadedFiles.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type
    }));
    setFiles([...files, ...fileData]);
  };

  return (
    <div>
      {/* Dashboard */}
      {view === "dashboard" && (
        <div className='mx-auto my-20 bg-white/10 w-1/2 h-full rounded-2xl p-4 shadow-lg'>
          <h1 className='text-3xl font-bold text-center text-gray-600 mb-10'>Event Name</h1>
          <div className='main-div flex items-center justify-center gap-4'>
            <div className='section-1 bg-emerald-950/70 w-1/3 h-48 p-4 m-4 rounded-lg'>
              <button onClick={() => setView("generateQR")} className='h-3/4 rounded px-4 py-2 w-full text-white bg-white/10'>
                <h1 className='font-bold text-2xl'>Generate <br />QR</h1>
              </button>
            </div>
            <div className='section-1 bg-emerald-950/70 w-1/3 h-48 p-4 m-4 rounded-lg'>
              <button onClick={() => setView("scanQR")} className='h-3/4 rounded px-4 py-2 w-full text-white bg-white/10'>
                <h1 className='font-bold text-2xl'>Scan <br />QR</h1>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate QR Page */}
      {view === "generateQR" && (
        <div className='flex min-h-screen '>
     
          <div className="w-64 bg-emerald-950/70 shadow-lg p-5 flex flex-col gap-4">
            <button onClick={() => setView("dashboard")} className='px-4 py-1 mb-4'>
              <Image src={backarrow} alt="back-arrow" className='h-8 w-8' />
            </button>
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button 
              className="flex items-center gap-2 text-white hover:text-emerald-200"
              onClick={() => setShowUpload(!showUpload)}
            >
              <Upload /> Upload Files
            </button>
            <button className="flex items-center gap-2 text-white hover:text-emerald-200">
              <FolderOpen /> View Files
            </button>
            <button className="flex items-center gap-2 text-white hover:text-emerald-200">
              <Mail /> Send Mails
            </button>
            
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4">File Management</h1>
            <button className="flex absolute items-center right-9 bg-emerald-950/70 px-4 py-2 top-8 gap-2 text-white font-semibold">
              <QrCode /> Generate QR
            </button>

          
            {showUpload && (
              <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="border p-2 rounded w-full mb-2"
                />
              </div>
            )}

          
            <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-emerald-950/70">
                  <tr>
                    <th className="p-3 text-left">File Name</th>
                    <th className="p-3 text-left">Size</th>
                    <th className="p-3 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{file.name}</td>
                      <td className="p-3">{file.size}</td>
                      <td className="p-3">{file.type}</td>
                    </tr>
                  ))}
                  {files.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-3 text-center text-gray-500">No files uploaded</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;