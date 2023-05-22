import React from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "../Button/Button";

import './Modal.css'

export default function Modal({ imageUser, handleClickCreate, disable, validator, toggleModal }) {

    return(

        <div className="container-modal">

            <div className="content-modal">

                <div className="header">
                    <div className="user-image">
                        <img src={imageUser} alt="" />
                    </div>

                    <div className="close-modal">
                        <AiOutlineClose />
                    </div>
                </div>

                <div className="text-area-container">
                    <textarea className="text-area" name="text" placeholder="O que está pensando?" />
                </div>

                <div className="footer">

                    <div className="footer-container">
                        <Button type="submit" text="Criar" className="button-create" onClick={handleClickCreate} disabled={disable === true || !validator}/>
                    </div>

                </div>

            </div>

        </div>
        
    );
};