import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { validateEmail, validatePassword } from "../../utils/Validators";
import Button from "../../components/Button/Button"

import './Login.css';

const userService = new UserService();

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    /*Função para resgatar o oque foi digitado pelo usuário nos INPUTS, referenciando
    sempre pelo NAME do input e o seu valor */
    const onChange = (event) => {
        const { name, value } = event.target;
        setLoginUser({ ...loginUser, [name]: value})
    }

    /* Função para fazer o LOGIN do usuário, nela usamos como parametro o useState loginUser
       para resgatar o email e senha do usuário e enviar para API */
    const handleSubmitLogin = async (event) => {
            event.preventDefault();

            // Desestruturação do objeto loginUser do useState
            const { email, password } = loginUser;

            // Verificar se existe algum input nulo
            if (!email || !password) {
                window.alert("Preencha todos os campos");
            }
            else {
                try {
                    // Desabilitar o botão de login
                    setLoading(true);
                    // Enviar as credencias para a API e armazenar a respota na variável
                    const response = await userService.login(loginUser);

                    // Verificar se o usuário está autenticado, se sim é redirecionado para a HOME
                    if (response === true) {
                        console.log('resposta do Login', response);
                        navigate('/home');
                    }
                    setLoading(false);
                }
                catch (error) {
                    window.alert('Algo deu errado', error);
                }
            }

        }

    // Função para validar oque foi digitado nos INPUTS
    const validatorInput = () => {
        return validateEmail(loginUser.email)
            && validatePassword(loginUser.password);
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
                        <Button name="btnLogin" className="btn" type="submit" text="Logar" onClick={handleSubmitLogin} disabled={loading === true || !validatorInput()} />
                    </div>
                    <Link to="/register" className="login_link">Criar conta</Link>
                </form>
            </div>
        </section>
    );
};