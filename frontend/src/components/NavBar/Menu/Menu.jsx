import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { RiLoginBoxLine } from "react-icons/ri"
import { BsPlusSquare } from "react-icons/bs"
import UserService from "../../../services/UserService"

import './Menu.css'
import MenuMore from "../../MenuMore/MenuMore";

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
                    <Link to="/home">
                        <span className="icon"><BsPlusSquare /></span>
                        <span className="txt-link">Criar</span>
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
                                            <span className="icon"><RiLoginBoxLine /></span>
                                            <span className="txt-link">Login</span>
                                        </Link>
                    }
                </li>
                <li className="menu-more-sidebar">
                    {authenticatedUser ?
                                        <MenuMore className="menu-more-button" />
                                        :
                                        null                       
                    }    
                </li>
            </ul>
        </div>
    );
};