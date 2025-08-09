import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className='bg-zinc-200 min-h-screen'>
    <Navbar/>
    <div className="container"><Outlet/></div>
    </div>

  )
}
