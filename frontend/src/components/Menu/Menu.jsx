import React from "react";
import PreviewProfile from "../PreviewProfile/PreviewProfile";

import './Menu.css'
import MenuMore from "../MenuMore/MenuMore";


export default function Menu(){    
    return (
        <div className="list-menu">
            <ul>
                <li>
                   <PreviewProfile />
                </li>
                <li>
                    <MenuMore />
                </li>
            </ul>
        </div>
    );
};