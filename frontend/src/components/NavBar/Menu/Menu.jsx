import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
import { BiUserCircle, BiLogIn } from "react-icons/bi"
import UserService from "../../../services/UserService"

import './Menu.css'

const userService = new UserService();

export default function Menu(){

    const authenticatedUser = userService.authenticatedUser();

    return (
        <div className="list-menu">
            <ul>
                <li>
                    <Link to="/home">
                        <span className="icon"><AiOutlineHome /></span>
                        <span className="txt-link">Home</span>
                    </Link>
                </li>
                <li>
                    {authenticatedUser ?
                                        <Link to={"/dashboard/user"}>
                                            <span className="icon"><BiUserCircle /></span>
                                            <span className="txt-link">Perfil</span>
                                        </Link>
                                        :
                                        <Link to="/login">
                                            <span className="icon"><BiLogIn /></span>
                                            <span className="txt-link">Login</span>
                                        </Link>
                    }
                </li>
            </ul>
        </div>
    );
};