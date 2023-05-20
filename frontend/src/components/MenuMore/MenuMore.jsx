import React, { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi"
import UserService from "../../services/UserService";

import './MenuMore.css'
import { useNavigate } from "react-router";

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
        navigate('/login');
        window.location.reload();
    }

    return (
        <div className="menu-more" ref={subMenuRef}>
                                            
            <div id="sub-menu-more" style={style} >
                <button className="button-more" onClick={logout}>
                    <span className="txt-link">Sair</span>
                </button>
            </div>
    
            <button className="button-more" onClick={handleClickShowSubMenu}>
                <span className="icon"><BiMenu /></span>
                <span className="txt-link">Mais</span>
            </button>
        
        </div>
    );
} 