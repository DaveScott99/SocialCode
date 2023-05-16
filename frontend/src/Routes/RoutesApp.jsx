import NavBar from "../components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Posts from '../pages/Posts'
import Footer from "../components/Footer/Footer ";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import FormNewPost from "../components/FormNewPost/FormNewPost";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RoutesApp() {
    return(
    <BrowserRouter>
        <NavBar />
        <main className="flex-fill">
            <div className="content">
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/posts" element={<Posts />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                            <ProtectedRoutes>
                                <DashboardUser />
                            </ProtectedRoutes>
                    } />
                    <Route path="/newpost" element={
                            <ProtectedRoutes>
                                <FormNewPost />
                            </ProtectedRoutes>
                    } />
                </Routes>
            </div>
        </main>
        <Footer />
    </BrowserRouter>
    )
}