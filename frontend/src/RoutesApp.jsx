import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Posts from './pages/Posts'
import Footer from "./components/Footer/Footer ";

export default function RoutesApp() {
    return(
    <BrowserRouter>
        <NavBar />
        <main className="flex-fill">
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/posts" element={<Posts />} />
                </Routes>
            </div>
        </main>
        <Footer />
    </BrowserRouter>
    )
}