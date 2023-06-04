import React from "react";
import Button from "../Button/Button";

import './UserInfo.css'

export default function UserInfo({ userData }) {
    return(
        <div className="user-stats">
            <div className="name-and-button">
                <span className="name">{userData.firstName} {userData.lastName}</span>
                <Button type="button" text="Editar perfil" className="btn" />
            </div>

            <span className="username">{userData.username}</span>
            <span className="biography">{userData.biography}</span>
            
            <div className="statistics">
                <div className="followers">
                    <span className="followers-count">0</span>
                    <span className="followers-label"> Seguidores</span>
                </div>
                <div className="projects">
                    <span className="followers-count">0</span>
                    <span className="followers-label"> Projetos</span>
                </div>
            </div>
        </div>
    );
};