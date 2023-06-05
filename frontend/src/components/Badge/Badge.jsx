import React from "react";

import './Badge.css';

export default function Badge({ imgBagde, link }) {
    return (
        <div className="badge">
            <a href={link} target="_blank" rel="noreferrer">
                <img src={imgBagde} alt="Bagde" />
            </a>
        </div>
    );
};