import React from "react";
import Sidebar from "../Nav/Sidebar/Sidebar";
import SearchBar from "../Generics/SearchBar/SearchBar";

import "./Layout.css";

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
                    <div className='content-sidebar'>
                        <Sidebar />
                    </div>
                </aside>

            </div>
    );
}
