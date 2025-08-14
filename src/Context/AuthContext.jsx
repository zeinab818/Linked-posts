import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {

    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('token')!=null)
    return <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}
