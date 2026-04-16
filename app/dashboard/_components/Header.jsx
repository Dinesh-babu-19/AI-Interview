"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {

  

    const path=usePathname();
    useEffect(()=>{

    })

    
  return (
    <div className='flex p-3 items-center justify-between bg-secondary shadow-md'>
        <Link href="/dashboard">
      <Image
        src="/int2.svg"
        width={130}
        height={130}
        alt="logo"
        className="cursor-pointer" // makes it show a pointer on hover
      />
    </Link>
        <ul className=' hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-primary font-bold'}`}>
            <Link href={"/dashboard"}>DashBoard</Link>
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>
            <Link href={"/dashboard/upgrade"}>Upgrade</Link>
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&&'text-primary font-bold'}`}>
            <Link href={"/dashboard/how"}>How it Works?</Link>
            </li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header