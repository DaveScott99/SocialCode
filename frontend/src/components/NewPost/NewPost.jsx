import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import UserService from "../../services/UserService";

import './NewPost.css';

const userService = new UserService();

export default function NewPost() {

    const [user, setUser] = useState();

    const findUser = async () => {
        const data =  await userService.findUserById(localStorage.getItem("id"));
        setUser(data);
    }

    useEffect(() => {
        findUser();
    }, [user])

    if(!user) return null;

    return(
        <div className="container-create">
            <div className="header">
                <div className="user-image">
                    <img src={ user.userImg } alt="" />
                </div>
            </div>

            <div className="body">
                <div className="text-area-container">
                    <textarea className="text-area" name="text" placeholder="O que está pensando?" />
                </div>

                <div className="footer">
                    <div className="footer-container">
                        <Button type="submit" text="Criar" className="button-create"/>
                    </div>
                </div>
            </div>
        </div>
    );
}