import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPosts from "../pages/DashboardPosts/DashboardPosts";

export default function RoutesApp() {
    return(
        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/dashboard/user" element={
                    <ProtectedRoutes>
                        <DashboardUser />
                    </ProtectedRoutes>
            } />
            <Route path="/dashboard/posts" element={
                    <ProtectedRoutes>
                        <DashboardPosts />
                    </ProtectedRoutes>
            } />
        </Routes>
    )
}