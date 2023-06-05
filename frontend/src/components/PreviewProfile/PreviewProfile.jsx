import React from "react";

import './PreviewProfile.css';


export default function PreviewProfile() {
    return (
        <div className="container-preview-profile">

            <div className="container-image-user">
                <img src="!" alt="Imagem do usuário" />
            </div>

            <div className="container-data-user">
                <div className="name-user">
                    <span className="name"></span>
                    <span className="username"></span>
                </div>

                <dir className="bio-user">
                    <span></span>
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