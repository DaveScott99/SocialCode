import React from "react"
import Menu from "./Menu/Menu";
import SearchBar from "./SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";

import './NavBar.css'
import UserService from "../../services/UserService";
import Button from "../Button/Button";

const userService = new UserService();

export default function NavBar() {

    const authenticatedUser = userService.authenticatedUser();
    const navigate = useNavigate();

    const handleClickDashBoard = () => {
      navigate('/dashboard/user')
    }
    
    const handleClickLogin = () => {
      navigate('/login')
    }

    return(
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom shadow-sm mb-3 color">
        <div className="container">
          <Link to="/home" className="navbar-brand text-dark fw-lighter fs-3 fw-bold">
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
                      {authenticatedUser ?
                                          <Button className='button' type='button' text='Perfil' onClick={handleClickDashBoard}>Perfil</Button>
                                         :
                                          <Button className='button' type='button' text='Login' onClick={handleClickLogin}>Login</Button>
                      }
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
}