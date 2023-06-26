import React, { useEffect } from 'react'
import './App.css'
// import Dashboard from './components/dashboard'
import Header from './components/dashboard/Header'
import SignIn from './components/sign-in'
import { Routes, Route } from "react-router-dom";
import Orders from './components/dashboard/Orders' 
import DashboardLayout from './components/Layouts/DashboardLayout'
import UserDetails from './components/dashboard/UserDetails'
import Chart from './components/dashboard/Chart'
import NotFound from './components/NotFound'
import Dashboard from './components/dashboard/Dashboard'
import Beneficial from './components/dashboard/Beneficial'
import Advisor from './components/dashboard/Advisors'
import Nurses from './components/dashboard/Nurses'
import ProductCategoryDetails from './components/dashboard/ProductCategoryDetails'

import { useDispatch } from 'react-redux';
import {
  loadUserFromLocalStorage 
} from './redux/actions/AuthAction.js'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminRoute from './utils/AdminRoute'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to load user data from localStorage
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <div>
          <Routes>
            <Route path="/" element={<SignIn />} />

            <Route path="/dashboard" element={
               <ProtectedRoute>
                 <DashboardLayout />
               </ProtectedRoute>
              }>
              <Route exact index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="stocks" exact element={<Orders />} />
              <Route path="stocks/:productCategoryId" element={<ProductCategoryDetails />} />
              <Route path="users/:userId" element={<UserDetails />} />
              <Route path="customers" element={<Chart />} />
              <Route element={ <AdminRoute />}>
                <Route path="advisors" element={<Advisor />} />
                <Route path="nurses" element={<Nurses />} />
              </Route>
              <Route path="beneficials" element={<Beneficial />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </div>
    </>
  )
}

export default App
