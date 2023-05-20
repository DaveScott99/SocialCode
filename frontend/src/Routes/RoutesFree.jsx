import { Routes, Route } from 'react-router-dom'
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";


export default function RoutesFree() {
    return(
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
        </Routes>
    )
}