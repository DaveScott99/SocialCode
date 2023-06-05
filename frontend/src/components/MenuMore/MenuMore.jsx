import React, { useContext, useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx"
import { BsGearWideConnected } from "react-icons/bs"
import { AuthContext } from "../../contexts/Auth/AuthContext";

import './MenuMore.css'
import { Link } from "react-router-dom";

export default function MenuMore() {

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

    const { logout } = useContext(AuthContext);

    return (
        <div className="menu-more" ref={subMenuRef}>

            <button className="drop-btn" onClick={handleClickShowSubMenu}>
                <RxHamburgerMenu className="more-icon" /> <span className="more-text">Mais</span> 
            </button>

            <div className="dropdown-content" style={style}>
                <Link to="/profile/configuration">
                    <BsGearWideConnected className="icon-sub-menu" /> Configurações
                </Link>
                <hr className="line-separetor" />
                <span onClick={logout}>Sair</span>
            </div>

        </div>
    );
} 