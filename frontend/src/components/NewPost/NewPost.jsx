import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import UserService from "../../services/UserService";

import './NewPost.css';
import Textarea from "../Textarea/Textarea";

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
                    <Textarea name="text-post" placeholder="O que está pensando?" className="text-area"/>
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