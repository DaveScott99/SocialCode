import React from "react";
import Button from "../Button/Button";

import './NewPost.css';

export default function NewPost() {
    return(
        <div className="container-create">
            <div className="header">
                <div className="user-image">
                    <img src="#" alt="" />
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