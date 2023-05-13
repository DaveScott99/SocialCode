import React from "react"
import SearchBar from "../Menu/SearchBar/SearchBar";

import './NavBar.css'
import Menu from "../Menu/Menu";

export default function NavBar() {
    return(
        <header className="header">
            <div className="container">
                <Menu />
                <SearchBar />
            </div>
        </header>
    );
}