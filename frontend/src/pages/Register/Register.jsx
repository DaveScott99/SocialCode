import React from "react";

import { Link } from "react-router-dom";

import './Register.css';

export default function Register() {
    return (
        <section id="form-section" className="form-container">
            <h1 className="registry_title">Cadastrar</h1>
                <div className="card-form">
                    <form name="newRegistry">
                        <div>
                            <label for="name" className="registry_label">Nome</label> 
                            <input name="name" id="name" className="form-input" type="text" />
                        </div>
                        <div>
                            <label for="email" className="registry_label">Email</label>
                            <input name="email" id="email" className="form-input" type="email" />
                        </div>
                        <div> 
                            <label for="password" className="registry_label">Senha</label>
                            <input name="password" id="password" className="form-input" type="password" /> 
                        </div>
            
                        <div class="btn-container">
                            <button name="btnRegistry" className="btn" type="submit">Registrar</button>
                        </div>

                        <Link to="/login" className="registry_link">Logar</Link>
                    </form>
                </div>
        </section>
    );
};