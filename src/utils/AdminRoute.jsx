import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = ()=>{
    const location = useLocation()
    const { user } = JSON.parse(localStorage.getItem('auth'))
    const userRole = user?.user?.role
    
    return userRole === 'admin' ? (
        <Outlet />
        ) : (
        <Navigate to ="/dashboard" state = {{ from: location}} replace />
    )
}

export default AdminRoute
