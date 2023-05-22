import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { BsPlusSquare } from "react-icons/bs"
import MenuMore from "../MenuMore/MenuMore";

import './Menu.css'

export default function Menu(){    
    return (
        <div className="list-menu">
            <ul>
                <li>
                    <Link to="/">
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
                    <Link to={"/profile"}>
                        <span className="icon"><BiUserCircle /></span>
                        <span className="txt-link">Perfil</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};