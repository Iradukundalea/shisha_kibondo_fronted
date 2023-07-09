import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const user = JSON.parse(localStorage.getItem('auth'))
    let location = useLocation()

    if(!user?.isLoggedIn){
       return <Navigate to='/login' state = {{ from: location}} replace />
    }

    return children
}

export default ProtectedRoute