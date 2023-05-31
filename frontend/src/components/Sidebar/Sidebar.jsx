import React from "react"
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";


import './Sidebar.css'
import SearchBar from "../SearchBar/SearchBar";

export default function Sidebar() {

    return(
        <div className="container-sidebar">
          <header className="header-sidebar">
            <Link to="/">
              <b>SocialCode</b>
            </Link>

            <SearchBar />
           
          </header>

          <div className="container-menu">
              <Menu />
          </div>
        </div>
    );
}