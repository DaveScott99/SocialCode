import React, { useState } from "react";
import { BiMenu } from "react-icons/bi"

import './MenuMore.css'

export default function MenuMore() {

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleClickShowSubMenu = () => {
        setShowSubMenu(!false);
    }

    const style = showSubMenu ? { display: 'block' } : {};

    return (
        <div className="menu-more">
                                            
            <div id="sub-menu-more" style={style}>
                <button className="button-more" >
                    <span className="icon"></span>
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