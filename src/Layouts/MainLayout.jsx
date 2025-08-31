import React, { useEffect, useState } from 'react'
import Navbar from './../Components/Navbar';
import './../index.css'
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark'); 
  }, [mode]);

  function changeMood() {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <main>
        <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-50 min-h-screen">
            <Navbar mode={mode} changeMood={changeMood}/>
            <div className="container mx-auto">
                <Outlet />
            </div>
        </div>
    </main>
  )
}
