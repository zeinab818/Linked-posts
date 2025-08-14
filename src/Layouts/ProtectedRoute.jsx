import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export default function ProtectedRoute({children}) {
    
    const {isLoggedIn} = useState(AuthContext)
    console.log(isLoggedIn);
    return isLoggedIn? children : <Navigate to={'/'}/>
    
}
