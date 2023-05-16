import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Register.css';
import UserService from "../../services/UserService";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "../../utils/Validators";

const userService = new UserService();

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [formRegistry, setFormRegistry] = useState ({
        name: "",
        email: "",
        password: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormRegistry({ ...formRegistry, [name]: value});
    }

    const handleSubmit =  async (event) => {
            event.preventDefault();
            try {
                setLoading(true);
                const { data } = await userService.resgister(formRegistry);
                if (data) {
                    const responseLogin = await userService.login({
                        email: formRegistry.email,
                        password: formRegistry.password
                    })

                    if(responseLogin === true){
                        alert('Usuário cadastrado com sucesso!');
                        navigate('/home');
                    }
                }
                setLoading(false);
            }
            catch (error) {
                alert('Algo deu errado', error);
            }

        }

    const validatorInput = () => {
        return validateEmail(formRegistry.email)
            && validateName(formRegistry.name)
            && validatePassword(formRegistry.password)
            && validateConfirmPassword(formRegistry.password, formRegistry.confirmPassword)
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

                        <div> 
                            <label htmlFor="password" className="registry_label">Confirmar senha</label>
                            <input name="confirmPassword" id="password" className="form-input" type="password" onChange={onChange} /> 
                        </div>
            
                        <div className="btn-container">
                            <button name="btnRegistry" className="btn" type="submit" onClick={handleSubmit} disabled={loading === true || !validatorInput()}>Registrar</button>
                        </div>

                        <Link to="/login" className="registry_link">Logar</Link>
                    </form>
                </div>
        </section>
    );
};