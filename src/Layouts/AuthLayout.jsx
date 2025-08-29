import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function AuthLayout() {
    return<main className='dark'>
                    <div className='bg-gray-100 dark:bg-gray-800 dark:text-gray-50 min-h-screen'>
                        <Navbar/>
                        <div className="min-h-screen dark:bg-gray-800 flex justify-center items-center bg-gray-200">
                            <Outlet/>
                        </div>
                    </div>
                </main>
    
}
