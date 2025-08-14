import React, {  useContext, useState } from 'react'
import {Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
export default function Navbar() {

    const [isloogesIn] = useState(localStorage.getItem('token')!=null)
    const {setIsLoggedIn}=useContext(AuthContext);
    
    const navigate=useNavigate();
    function logout(){
        localStorage.removeItem('token');
        setIsLoggedIn(null)
        navigate('/login');
    }
 
    return <>
        <HeroNavbar>
            <NavbarBrand>
                
                <p className="font-bold text-inherit">Linked Posts</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                {isloogesIn?
                    <NavbarItem onClick={logout} className='cursor-pointer'>
                        LogOut
                    </NavbarItem>:
                <>
                    <NavbarItem>
                        <NavLink to={'/register'}>Sign Up</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to={'/login'}>Log IN</NavLink>
                    </NavbarItem>
                </>
                }
                
            </NavbarContent>
        </HeroNavbar>
    </>
}
