import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService"
import Button from "../Button/Button";

import './PreviewProfile.css';

const userService = new UserService();

export default function PreviewProfile() {

    const [user, setUser] = useState();

    const findUser = async () => {
        const data = await userService.findUserById(localStorage.getItem("id"));
        setUser(data);
    }

    useEffect(() => {
        findUser();
    }, [user]);

    if(!user) return null;

    return (
        <div className="container-preview-profile">

            <div className="container-image-user">
                <img src={user.userImg} alt="Imagem do usuário" />
            </div>

            <div className="container-data-user">
                <div className="name-user">
                    <span className="name">{user.firstName} {user.lastName}</span>
                    <span className="username">{user.username}</span>
                </div>

                <dir className="bio-user">
                    <span>{user.biography}</span>
                </dir>

                <div className="container-followers">
                    <span className="followers">
                        0 Seguidores
                    </span>
                    ·
                    <span className="following">
                        0 Seguindo
                    </span>
                </div>

            </div>
        </div>
    );
};