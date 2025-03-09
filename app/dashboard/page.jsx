'use client'
import React from 'react'
import { useState } from 'react'
import qrimg from '@/public/qrimg.svg'
import qrscanner from '@/public/qrscanner.svg'
import backarrow from '@/public/backarrow.svg'
import Image from 'next/image';

function page() {
  const[view , setView] = useState("dashboard");


  return (
    <div>
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

    {view === "generateQR" && (
    <div className='mx-auto my-20 bg-emerald-950/20 w-1/2 h-full rounded-2xl p-4 shadow-lg'>
    <button onClick={() => setView("dashboard")} className='px-4 py-1 mb-8'>
        <Image src={backarrow} 
        alt="back-arrow"
        className='h-8 w-8' />
    </button>
    <div className='flex justify-between items-center'>
    <div className='flex flex-col h-full'>
    <button className='bg-white px-2 py-2 rounded-md m-2'>
        <input type="file" name="Upload file" id="csv" />
    </button>
    <button className='bg-white py-2 rounded-md m-2 text-md font-semibold'> View Files </button>
    <button className='bg-white py-2 rounded-md m-2 text-md font-semibold'> Send Mail </button>
    </div>
    <Image
    src={qrimg}
    alt='qr-image'
    className='h-42 w-42 m-4 p-2'/>
    </div>
    </div>
         
    )}


    {view === "scanQR" && (
        <div className='mx-auto my-20 bg-emerald-950/20 w-2/5 h-full rounded-2xl p-4 shadow-lg'>
        <button onClick={() => setView("dashboard")} className='px-4 py-1 mb-8'>
        <Image src={backarrow} 
        alt="back-arrow"
        className='h-8 w-8' />
        </button>
       <div className='flex justify-between items-center '>
        <div className='flex flex-col gap-6 m-4'>
            <button className='bg-white px-4 py-2 font-semibold rounded-md'>Verify QR</button>
            <button className='bg-white px-4 py-2 font-semibold rounded-md'>Send Verification mail</button>
        </div>
        <Image
           src={qrscanner}
           alt='qr-image'
           className='h-48 w-48 m-4 p-2'/>
        </div>
        </div>
    )}
    </div>
  )
}

export default page
