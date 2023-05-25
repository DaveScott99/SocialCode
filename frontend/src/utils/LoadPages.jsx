import React from "react"
import Sidebar from "../components/Sidebar/Sidebar";

const LoadPages = ({ children }) => {
    return (
        <div className="wrapper">

        <main className="main">
            {children}
        </main>

        <aside className="l-sidebar">
            <div className='content-sidebar'>
              <Sidebar />
            </div>
        </aside>

      </div>
    );
}

export default LoadPages;