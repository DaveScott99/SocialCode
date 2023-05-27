import React, { useContext } from "react";

import './Menu.css'
import MenuMore from "../MenuMore/MenuMore";
import { Link } from "react-router-dom";

export default function Menu(){  
    return (
        <div className="list-menu">
            <ul>
                <li>
                    <MenuMore />
                </li>
                <li>
                    <Link to="/profile">
                        Perfil
                    </Link>
                </li>
            </ul>
        </div>
    );
};