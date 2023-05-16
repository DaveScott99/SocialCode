import React from "react";
import { useNavigate } from "react-router-dom";

import './DashboardUser.css';

export default function DashboardUser() {

    const navigate = useNavigate();

    const handleClickNewPost = () => {
        navigate('/newpost')
    }

    return (
        <div >
            <h1>DashboardUser</h1>
            <button className="newPost_button" onClick={handleClickNewPost}>Novo Post</button>
        </div>

    );
};