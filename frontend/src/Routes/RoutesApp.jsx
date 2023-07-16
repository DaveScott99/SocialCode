import NavBar from "../components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Posts from "../pages/Posts";
import Footer from "../components/Footer/Footer ";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPosts from "../pages/DashboardPosts/DashboardPosts";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="flex-fill">
        <div className="content">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/dashboard/user" element={<DashboardUser />} />
            <Route path="/dashboard/posts" element={<DashboardPosts />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
