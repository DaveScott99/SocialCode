import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import './Login.css';
import UserService from "../../services/UserService";

const userService = new UserService();

export default function Login() {

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setLoginUser({ ...loginUser, [name]: value})
    }

    const handleSubmit = async (event) => {
            event.preventDefault();

            const { email, password } = loginUser;
            if (!email || !password) {
                window.alert("Preencha todos os campos");
            }
            else {
                try {
                    const response = await userService.login(loginUser);
                    if (response === true) {
                        console.log('response do Login', response);
                        navigate('/home');
                    }
                }
                catch (error) {
                    window.alert('Algo deu errado', error);
                }
            }

        }

    return(
        <section id="form-section" className="form-container">
            <h1 className="login_title">Fazer login</h1>
            <div className="card-form">
                <form name="newLogin">
                    <div className="error-login" data-error="login">E-mail ou senha incorretos</div>
                    <div>
                        <label htmlFor="email" className="login_label">Email</label> 
                        <input name="email" id="email" className="form-input" type="email"  onChange={onChange}/>
                    </div>
                    <div> 
                        <label htmlFor="password" className="login_label">Senha</label>
                        <input name="password" id="password" className="form-input" type="password" onChange={onChange}/>
                        <div className="error-message" data-error="password"></div>
                    </div>
                    <div className="btn-container">
                        <button name="btnLogin" className="btn" type="submit" onClick={handleSubmit}>Logar</button>
                    </div>
                    <Link to="/register" className="login_link">Criar conta</Link>
                </form>
            </div>
        </section>
    );
};