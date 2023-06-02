import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import "./Layout.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Layout({ children }) {
    return (
            <div className="wrapper">
                <main className="main">
                    <header className="header">
                        <div className="search-bar">
                            <SearchBar />
                        </div>

                    </header>
                    { children }
                </main>

                <aside className="l-sidebar">
                    <nav className='content-sidebar'>
                        <Sidebar />
                    </nav>
                </aside>

            </div>
    );
}
