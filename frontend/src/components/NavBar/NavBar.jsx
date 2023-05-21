import React from "react"
import Menu from "./Menu/Menu";
import { Link } from "react-router-dom";

import './NavBar.css'

export default function NavBar() {

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