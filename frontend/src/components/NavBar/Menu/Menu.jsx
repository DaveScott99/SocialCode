import React from "react";
import { Link } from "react-router-dom";

import './Menu.css'

export default function Menu(){
    return (
        <div className="menu">
            <ul className="list">
                <li className="item">
                    <Link to="/">Home</Link>
                </li>
                <li className="item">
                    <Link to="/posts">Posts Recentes</Link>
                </li>
            </ul>
        </div>
    );
};