import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function AuthLayout() {
        const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
    
        useEffect(() => {
            localStorage.setItem('mode', mode);
            document.documentElement.classList.toggle('dark', mode === 'dark'); 

        }, [mode]);
    
        function changeMood() {
            setMode(mode === 'dark' ? 'light' : 'dark');
        }
    return<main>
        <div className='bg-gray-100 dark:bg-gray-800 dark:text-gray-50 min-h-screen'>
            <Navbar mode={mode} changeMood={changeMood}/>
            <div className="min-h-screen dark:bg-gray-800 flex justify-center items-center bg-gray-200">
                <Outlet/>
            </div>
        </div>
    </main>
    
}
