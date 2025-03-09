import React from 'react'
import { Separator } from '@radix-ui/react-separator';

const cards = [
    { title: "Code-Mystique", description: "This is the first card." },
    { title: "Code-Fest", description: "This is the second card." },
    { title: "Card 3", description: "This is the third card." },
    { title: "Card 4", description: "This is the fourth card." },
    { title: "Card 5", description: "This is the fifth card." },
    { title: "Card 6", description: "This is the sixth card." },
  ];

function page() {
  return (
    <div className='flex items-center justify-between'>
        <div className='w-1/5 h-screen rounded-r-2xl bg-emerald-950/70 flex justify-center pt-10'>
        <h1 className='text-white font-bold text-3xl text-center absolute'>EVENTS</h1>
        <ul className='mt-10 py-6 text-white'>
            <li className='p-3 mb-4'>Code Mystique</li>
            <Separator/>
            <li className='p-3 mb-4'>Code Fest</li>
            <Separator/>
            <li className='p-3 mb-4'>Code Twist</li>
            <Separator/>
            <li className='p-3 mb-4'>Event number-4</li>
        </ul>
        </div>
     <div className="mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
            <div key={index} className={`shadow-lg rounded-2xl p-7 ${
            index % 3 === 1 ? "bg-white text-black" :"bg-emerald-950/70 text-white"}`}>
                <h3 className='text-xl'>{card.title}</h3>
                <h3 className='font-extralight mt-3 text-sm'>{card.description}</h3>
            </div>
        ))}    
       
      </div>
    </div>
  );

    </div>
  )
}

export default page