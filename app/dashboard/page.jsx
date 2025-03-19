'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Html5QrcodeScanner } from "html5-qrcode";
import backarrow from '@/public/backarrow.svg';
import qrscanner from '@/public/qrscanner.svg';
import CsvUploader from '@/components/CsvUploader';
import Papa from 'papaparse';
import { FolderOpen, Mail, QrCode, Upload } from "lucide-react";

function Page() {
  const [view, setView] = useState("dashboard");
  const [showUpload, setShowUpload] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250
      });

      scanner.render(
        (result) => {
          setScanResult(result);
          scanner.clear();
          setShowScanner(false);
        },
        (error) => console.log("QR Scan Error:", error)
      );

      return () => scanner.clear();
    }
  }, [showScanner]);

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
        <div className='flex min-h-screen'>
          <div className="w-64 bg-emerald-950/70 shadow-lg p-5 flex flex-col gap-4">
            <button onClick={() => setView("dashboard")} className='px-4 py-1 mb-4'>
              <Image src={backarrow} alt="back-arrow" className='h-8 w-8' />
            </button>
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button 
              className="flex items-center gap-2 text-white hover:text-emerald-200"
              onClick={() => setShowUpload(!showUpload)}
            >
              <Upload /> Upload CSV
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
            <h1 className="text-2xl font-bold mb-4">Files Management</h1>
            <button className="flex absolute items-center right-9 bg-emerald-950/70 px-4 py-2 top-8 gap-2 text-white font-semibold">
              <QrCode /> Generate QR
            </button>
            {showUpload && <CsvUploader />}
          </div>
        </div>
      )}

      {/* Scan QR Page */}
      {view === "scanQR" && (
        <div className='mx-auto my-20 bg-emerald-950/20 w-2/5 h-full rounded-2xl p-4 shadow-lg'>
          <button onClick={() => setView("dashboard")} className='px-4 py-1 mb-8'>
            <Image src={backarrow} alt="back-arrow" className='h-8 w-8' />
          </button>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-6 m-4'>
              
              {/* Verify QR Button */}
              <button onClick={() => setShowScanner(true)} className='bg-white px-4 py-2 font-semibold rounded-md'>
                Verify QR
              </button>

              <button className='bg-white px-4 py-2 font-semibold rounded-md'>Send Verification mail</button>
            </div>
            <Image src={qrscanner} alt='qr-image' className='h-48 w-48 m-4 p-2' />
          </div>

          {showScanner && <div id="reader" className="mt-6"></div>}

          {scanResult && <p className="mt-4 p-4 mb-4 bg-white rounded-xl text-emerald-950/70 text-center font-semibold">Scanned QR: {scanResult}</p>}
        </div>
      )}
    </div>
  );
}

export default Page;
