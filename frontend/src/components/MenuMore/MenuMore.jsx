import React, { useEffect, useRef, useState } from "react";
import { BsGear } from "react-icons/bs"
import UserService from "../../services/UserService";
import { useNavigate } from "react-router";

import './MenuMore.css'

const userService = new UserService();

export default function MenuMore() {

    const navigate = useNavigate();
    const [showSubMenu, setShowSubMenu] = useState(false);
    const subMenuRef = useRef(null);

    const handleClickShowSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    }

    const style = showSubMenu ? { display: 'block' } : { display: 'none' };

    useEffect(() => {
        const closeSubMenyOnClickOutside = (event) => {
            if (showSubMenu && !subMenuRef.current.contains(event.target)) {
                setShowSubMenu(false);
            }
        }
        
        document.addEventListener('mousedown', closeSubMenyOnClickOutside);

        return () => {
            document.removeEventListener('mousedown', closeSubMenyOnClickOutside);
        }

    }, [showSubMenu])

    const logout = () => {
        userService.logout();
        navigate('/authentication');
        window.location.reload();
    }

    return (
        <div className="menu-more" ref={subMenuRef}>

            <button className="drop-btn" onClick={handleClickShowSubMenu}>
                <BsGear />
            </button>

            <div className="dropdown-content" style={style}>
                <span onClick={logout}>Sair</span>
            </div>

        </div>
    );
} 