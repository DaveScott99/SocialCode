import React from "react"
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

import './Sidebar.css'

export default function Sidebar() {

    return(
        <div className="container-sidebar">
          <div className="logo-app">
            <Link to="/">
              <b>SocialCode</b>
            </Link>
          </div>

          <div className="container-menu">
              <Menu />
          </div>
        </div>
    );
}