import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export default function AuthProtectedRoute({children}) {
    
    const {isLoggedIn} = useState(AuthContext)
    return !isLoggedIn? children : <Navigate to={'/login'}/>
    
}
