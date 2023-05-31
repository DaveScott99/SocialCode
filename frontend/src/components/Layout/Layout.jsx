import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import "./Layout.css";

export default function Layout({ children }) {
    return (
            <div className="wrapper">
                <main className="main">
                    <header className="header">
                        NAV
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
