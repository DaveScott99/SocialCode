import React, { useContext } from "react";
import MenuMore from "../MenuMore/MenuMore";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AiOutlineHome } from "react-icons/ai";

import './Menu.css';
import { Avatar } from "@mui/material";

export default function Menu(){  
   
    const { user } = useContext(AuthContext);
    
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
                    <Link to={`/profile/${user.username}`}>
                        <div className="profile-image">
                            <Avatar className="user-pic-sidebar" alt="User image" src={user.profilePhoto}/>
                        </div>
                        <span className="txt-link">Perfil</span>
                    </Link>
                </li>
                <li className="menu-more-li">
                    <MenuMore />
                </li>
            </ul>
        </div>
    );
};