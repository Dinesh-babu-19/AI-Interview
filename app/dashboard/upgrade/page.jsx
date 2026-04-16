"use client"
import React from 'react'
import PricingPlan from '../_data/PricingPlan';
import { useUser } from '@clerk/nextjs';

function Upgrade() {


    const{user}=useUser();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <div >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-center">Upgrade</h2>
            <h2 className='text-gray-500 text-center mt-2'>Upgrade to monthly plan to access unlimited mock interview</h2>
        </div>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8 my-10">
    
    {PricingPlan.map((item,index)=>(
        <div key={index} className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          {item.duration}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {item.price}$</strong>

          <span className="text-sm font-medium text-gray-700">/{item.duration}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
         {item.offering.map((offer, idx) => (
    <li key={idx} className="flex items-center gap-1">
      
      <span className="text-gray-700">{offer.value}</span>
    </li>
  ))}
      </ul>

      <a
        href={item.link+'?prefilled_email='+user?.primaryEmailAddress.emailAddress} target='_blank'
        className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
      >
        Get Started
      </a>
    </div>
    ))}
    
  </div>
</div>
  )
}

export default Upgrade;