import React from "react";
import ButtonEditUserBackground from '../ButtonEditUserBackground/ButtonEditUserBackground'

import './UserBackgroundImage.css';

export default function UserBackgroundImage({ backgroundImage }) {

    return (
        <>
            <div className="background-image-container">
                <img src={backgroundImage} alt="Current background user" />
            </div>

            <ButtonEditUserBackground />

        </>
    );
};