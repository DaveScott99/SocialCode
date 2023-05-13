import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Posts from './pages/Posts'

export default function RoutesApp() {
    return(
    <BrowserRouter>
        <NavBar />
        <main>
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/posts" element={<Posts />} />
                </Routes>
            </div>
        </main>
    </BrowserRouter>
    )
}