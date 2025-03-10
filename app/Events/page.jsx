'use client'

import React from 'react'
import Image from 'next/image';
import plus from '@/public/plus.svg'
import { useState } from 'react';

function page() {
  const initialCards = [
    { title: "Code-Mystique", description: "This is the first card." },
    { title: "Code-Fest", description: "This is the second card." },
    { title: "Code Twist", description: "This is the third card." },
  ];

  const [cards, setcards] = useState(initialCards);

  const AddNewEvent = () => {
    const newevent = {
      title:`New Event ${cards.length + 1}`,
      description:`This is the event number ${cards.length + 1}`,
    };
    setcards(prevCards => [...prevCards, newevent]);
  };

  return (
    <>
    <div className='absolute right-20 top-8 flex items-center justify-center gap-3'>
        <Image
          src={plus}
          alt='plus'
          className='cursor-pointer'
          onClick={AddNewEvent}/>
        <button className='px-4 py-2 bg-white rounded' onClick={AddNewEvent}>
          Add New
        </button>
    </div>
    <div className='flex items-center justify-between'>
      
        <div className='w-1/5 h-screen rounded-r-2xl bg-emerald-950/70 flex justify-center pt-10'>
        <h1 className='text-white font-bold text-3xl text-center absolute'>EVENTS</h1>
        <ul className='mt-10 py-6 text-white'>
            {cards.map((card, index) => (
              <li key={index} className='p-3 mb-4'>{card.title}</li>
            ))}
          </ul>
        </div>
        
       
     <div className="mx-auto p-8 cursor-pointer">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
            <div key={index} className={`shadow-lg rounded-2xl p-7 ${
            index % 3 === 1 ? "bg-white text-black" :"bg-emerald-950/70 text-white"}`}>
                <h3 className='text-xl'><a href="/dashboard">{card.title}</a></h3>
                <h3 className='font-extralight mt-3 text-sm'>{card.description}</h3>
            </div>
        ))}    
       
      </div>
    </div>
  );

    </div>
    </>
  )
 
}

export default page