import React, { useContext, useState } from "react";
import {
    Navbar as HeroNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    } from "@heroui/react";
    import { NavLink, useLocation, useNavigate } from "react-router-dom";
    import { AuthContext } from "../Context/AuthContext";

    export default function Navbar({mode,changeMood}) {
    const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    function logout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
        setOpen(false); 
    }

    function toggleMenu() {
        setOpen(!open);
    }

    return (
        <>
        <HeroNavbar className="flex justify-center items-center px-4 dark:bg-gray-900 dark:text-gray-100">
            <NavbarBrand>
            <NavLink to={"/"}>
                <p className="font-bold text-inherit">Linked Posts</p>
            </NavLink>
            </NavbarBrand>

            {/* Desktop Links */}
            <NavbarContent className="hidden md:flex gap-4" justify="end">
            {isLoggedIn ? (
                <>
                <NavbarItem onClick={logout} className="cursor-pointer">
                    LogOut
                </NavbarItem>
                {location.pathname === "/profile" ? (
                    <NavbarItem>
                    <NavLink to="/">Home</NavLink>
                    </NavbarItem>
                ) : (
                    <NavbarItem>
                    <NavLink to="/profile">Profile</NavLink>
                    </NavbarItem>
                )}
            
                </>
            ) : (
                <>
                <NavbarItem>
                    <NavLink to={"/register"}>Sign Up</NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to={"/login"}>Log In</NavLink>
                </NavbarItem>
                </>
            )}
            </NavbarContent>

            {/* Mobile Menu Icon */}
            <div
            onClick={toggleMenu}
            className="md:hidden cursor-pointer text-gray-800"
            >
            {open ? (
                // Close Icon
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7  dark:text-gray-100"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            ) : (
                // Hamburger Icon
             <>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7  dark:text-gray-100"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                </svg>
                 
             </>
            )}
            </div>
            <div onClick={()=>changeMood()}>
                {mode=='dark'?<svg className="cursor-pointer size-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            :<svg  className="cursor-pointer size-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>}
            </div>
            
            
            

        </HeroNavbar>

        {/* Mobile Dropdown Menu */}
        {open && (
            <div className="md:hidden  dark:bg-gray-900 dark:text-gray-100 bg-gray-100 shadow-md flex flex-col gap-4 p-4">
            {isLoggedIn ? (
                <>
                <button onClick={logout} className="text-left cursor-pointer">
                    LogOut
                </button>
                {location.pathname === "/profile" ? (
                    <NavLink to="/" onClick={() => setOpen(false)}>
                    Home
                    </NavLink>
                ) : (
                    <NavLink to="/profile" onClick={() => setOpen(false)}>
                    Profile
                    </NavLink>
                )
                }
                
                </>
            ) : (
                <>
                <NavLink to="/register" onClick={() => setOpen(false)}>
                    Sign Up
                </NavLink>
                <NavLink to="/login" onClick={() => setOpen(false)}>
                    Log In
                </NavLink>
                </>
            )}
            </div>
        )}
        </>
    );
    }
