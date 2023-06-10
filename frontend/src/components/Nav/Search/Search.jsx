import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import SearchBar from "../../Generics/SearchBar/SearchBar";

import './Search.css'

export default function Search() {

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

    return (
        <div className="search" ref={subMenuRef}>

            <button className="search-btn" onClick={handleClickShowSubMenu}>
                <AiOutlineSearch className="more-icon" />
            </button>

            <div className="search-content" style={style}>
                <SearchBar />
            </div>

        </div>
    );
} 