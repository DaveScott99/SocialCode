import React from "react"
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import SearchBar from "../../Generics/SearchBar/SearchBar";

import './Sidebar.css'

export default function Sidebar() {

    return(
        <div className="container-sidebar">
          <header className="header-sidebar">
            {/* 
              <SearchBar />
            */}
          </header>

          <div className="container-menu">
              <Menu />
          </div>
        </div>
    );
}