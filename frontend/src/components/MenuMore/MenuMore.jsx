import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx"
import { BsGearWideConnected } from "react-icons/bs"
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
                <RxHamburgerMenu className="more-icon" /> <span className="more-text">Mais</span> 
            </button>

            <div className="dropdown-content" style={style}>
                <span><BsGearWideConnected className="icon-sub-menu" /> Configurações</span>
                <hr className="line-separetor" />
                <span onClick={logout}>Sair</span>
            </div>

        </div>
    );
} 