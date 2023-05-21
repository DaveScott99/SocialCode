import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/" element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
            } />
            <Route exact path="/profile" element={
                    <ProtectedRoutes>
                        <DashboardUser />
                    </ProtectedRoutes>
            } />
        </Routes>
    )
}