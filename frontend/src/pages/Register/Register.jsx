import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Register.css';
import UserService from "../../services/UserService";
// import { UseApi } from "../../hooks/UseApi";

const userService = new UserService();

export default function Register() {

    const navigate = useNavigate();

    const [userRegistry, setUserRegistry] = useState ({
        name: "",
        email: "",
        password: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setUserRegistry({ ...userRegistry, [name]: value});
    }

    const handleSubmit =  async (event) => {
            event.preventDefault();

            const { name, email, password } = userRegistry;

            if (!name || !email || !password) {
                window.alert("Preencha todos os campos");
            }
            else {
                try {
                    const { data } = await userService.resgister(userRegistry);
                    if (data) {
                        const responseLogin = await userService.login({
                            email: email,
                            password: password
                        })

                        if(responseLogin === true){
                            alert('Usuário cadastrado com sucesso!');
                            navigate('/home');
                        }
                    }
                }
                catch (error) {
                    alert('Algo deu errado', error);
                }
            }
        }

    return (
        <section id="form-section" className="form-container">
            <h1 className="registry_title">Cadastrar</h1>
                <div className="card-form">
                    <form name="newRegistry">
                        <div>
                            <label htmlFor="name" className="registry_label">Nome</label> 
                            <input name="name" id="name" className="form-input" type="text" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="registry_label">Email</label>
                            <input name="email" id="email" className="form-input" type="email" onChange={onChange} />
                        </div>
                        <div> 
                            <label htmlFor="password" className="registry_label">Senha</label>
                            <input name="password" id="password" className="form-input" type="password" onChange={onChange} /> 
                        </div>
            
                        <div className="btn-container">
                            <button name="btnRegistry" className="btn" type="submit" onClick={handleSubmit}>Registrar</button>
                        </div>

                        <Link to="/login" className="registry_link">Logar</Link>
                    </form>
                </div>
        </section>
    );
};