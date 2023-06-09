import React from "react";
import { IoIosClose } from "react-icons/io"

import './DefaultModal.css'

export default function DefaultModal({ id = 'modal', children, onClose = () => {} }) {

    const handleOutsideClick = (event) => {
        if (event.target.id === id) {
            onClose();
        }
    }

    return(
        <div id={id} className="modal" onClick={handleOutsideClick}>
            <div className="modal-container">
                
                <div className="close-modal-container">
                    <IoIosClose className="btn-close-modal" onClick={onClose} />
                </div>

                <div className="modal-content">
                    { children }
                </div>
             
            </div>
        </div>
    );
};