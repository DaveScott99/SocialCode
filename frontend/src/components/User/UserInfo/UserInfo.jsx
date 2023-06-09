import React, { useContext } from "react";
import Button from "../../Generics/Button/Button";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import EditProfileButton from "../EditProfileButton/EditProfileButton";

import './UserInfo.css'

export default function UserInfo({ userData }) {

    const { user } = useContext(AuthContext);

    return(
        <div className="user-stats">
            <div className="name-and-button">
                <span className="name">{userData.firstName} {userData.lastName}</span>

                {
                    userData.id !== user.id
                                    ? <Button type="button" text="Seguir" className="btn" />
                                    : <EditProfileButton />
                                     
                }
               
            </div>

            <span className="username">{userData.username}</span>
            <span className="biography">{userData.title}</span>
            
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