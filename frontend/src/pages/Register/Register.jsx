import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import './Register.css';
import { UseApi } from "../../hooks/UseApi";

export default function Register() {

    const [userRegistry, setUserRegistry] = useState ({
        name: "",
        email: "",
        password: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setUserRegistry({ ...userRegistry, [name]: value});
    }

    const api = UseApi();

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();

            const { name, email, password } = userRegistry;

            if (!name || !email || !password) {
                window.alert("Preencha todos os campos");
            }

            api.registry(userRegistry);
        },
        [api, userRegistry]
    )
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