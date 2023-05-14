import React from "react"
import Menu from "./Menu/Menu";
import SearchBar from "./SearchBar/SearchBar";
import LoginButton from "./LoginButton/LoginButton";
import { Link } from "react-router-dom";

import './NavBar.css'

export default function NavBar() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom shadow-sm mb-3 color">
        <div className="container">
          <Link to="/" className="navbar-brand text-dark fw-lighter fs-3 fw-bold">
            <b>ParaCodar</b>
          </Link>
          <button
            className="navbar-toggler bg-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                  <Menu />
              </li>
            </ul>
            <SearchBar />
            <div className="align-self-end">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link to="/" className="nav-link text-dark">
                          <LoginButton />
                      </Link>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
}