import React, { useState } from "react";
import FormRegistry from "../../components/FormRegistry/FormRegistry";
import FormLogin from "../../components/FormLogin/FormLogin";
import LoginImage from "../../assets/login-image.svg";

import './Authentication.css';

export default function Authentication() {

    const [renderForm, setRenderForm] = useState(true);

    const handleClickRender = () => {
        setRenderForm(!renderForm);
    }

    return(
        <>

            <div className="container-page">

                <article className="image-container">
                    <img src={LoginImage} alt="Imagem login" />
                </article>

                <article className="card-form">
            
                    <div className="logo-app">
                        <h1>SocialCode</h1>
                    </div>

                    {
                        renderForm 
                        ?
                        <>
                            <FormLogin className="form-input"/> 
                            <div className="container-link-registry">
                                <span>Não tem uma conta? <span onClick={handleClickRender} className="toggle-render">Cadastre-se</span></span>
                            </div>
                        </> 
                        : 
                        <>
                            <FormRegistry className="form-input"/>
                            <div className="container-link-registry">
                                <span>Tem uma conta? <span onClick={handleClickRender} className="toggle-render">Entrar</span></span>
                            </div>
                        </>
                    }
                </article> 
            </div>
        </>
    );
};