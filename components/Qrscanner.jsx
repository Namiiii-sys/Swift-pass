"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const QRScanner = ({ onScanSuccess }) => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (result) => {
        setScanResult(result);
        onScanSuccess(result);
        scanner.clear();
      },
      (error) => console.log("QR Scan Error:", error)
    );

    return () => scanner.clear();
    }, []);

  return (
    <div className="flex flex-col items-center">
      <div id="reader"></div>
      {scanResult && <p className="mt-4 text-emerald-950/70">Scanned: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
