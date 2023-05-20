import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPosts from "../pages/DashboardPosts/DashboardPosts";

export default function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/home" element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
            } />
            <Route exact path="/dashboard/user" element={
                    <ProtectedRoutes>
                        <DashboardUser />
                    </ProtectedRoutes>
            } />
            <Route exact path="/dashboard/posts" element={
                    <ProtectedRoutes>
                        <DashboardPosts />
                    </ProtectedRoutes>
            } />
        </Routes>
    )
}