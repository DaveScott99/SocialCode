import React from "react";

import { Link } from "react-router-dom";

import './Login.css';

export default function Login() {
    return(
        <section id="form-section" className="form-container">
            <h1 className="login_title">Fazer login</h1>
            <div className="card-form">
                <form name="newLogin">
                    <div className="error-login" data-error="login">E-mail ou senha incorretos</div>
                    <div>
                        <label for="email" className="login_label">Email</label> 
                        <input name="email" id="email" className="form-input" type="email" />
                    </div>
                    <div> 
                        <label for="password" className="login_label">Senha</label>
                        <input name="password" id="password" className="form-input" type="password" />
                        <div className="error-message" data-error="password"></div>
                    </div>
                    <div className="btn-container">
                        <button name="btnLogin" className="btn" type="submit">Logar</button>
                    </div>
                    <Link to="/register" className="login_link">Criar conta</Link>
                </form>
            </div>
    </section>
    );
};