import React, { useContext } from "react";
import MenuMore from "../MenuMore/MenuMore";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { Avatar } from "@mui/material";
import Search from "../Search/Search";

import './Menu.css';

export default function Menu(){  
   
    const { user } = useContext(AuthContext);
    
    return (
        <div className="list-menu">
            <ul>
                <li>
                    <Link to="/" className="menu-item">
                        <span className="icon"><AiFillHome /></span>
                        <span className="txt-link">Home</span>
                    </Link>
                </li>
                <li>
                    <Search />
                </li>
                <li>
                    <Link to={`/profile/${user.username}`} className="menu-item">
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