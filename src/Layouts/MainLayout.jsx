import React from 'react'
import Navbar from './../Components/Navbar';

import { Outlet } from 'react-router-dom';


export default function MainLayout() {
    return <>
        <Navbar/>
            <div className="bg-gray-100 pt-4 min-h-screen">
                <Outlet/>
            </div>

    </>
}
