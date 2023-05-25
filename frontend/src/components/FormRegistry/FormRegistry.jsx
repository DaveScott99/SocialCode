import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../../services/UserService";
import { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validateName, validatePassword, validateUsername } from "../../utils/Validators";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { toast } from "react-toastify";

const userService = new UserService();

export default function FormRegistry({ className }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [formRegistry, setFormRegistry] = useState ({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormRegistry({ ...formRegistry, [name]: value});
    }

    const handleSubmitRegistry =  async (event) => {
        event.preventDefault();

        setLoading(true);
        
        userService.resgister(formRegistry);

        setLoading(false);

    }

    const validatorInput = () => {
        return validateFirstName(formRegistry.firstName)
            && validateLastName(formRegistry.lastName)
            && validateUsername(formRegistry.username)
            && validateEmail(formRegistry.email)
            && validatePassword(formRegistry.password)
            && validateConfirmPassword(formRegistry.confirmPassword)
    }

    return (

        <form className="form-credentials" >
            
            <Input name="firstName" type="text" className={className} placeholder="Nome" onChange={onChange}/>
            <Input name="lastName" type="text" className={className} placeholder="Sobrenome" onChange={onChange}/>
            <Input name="username" type="text" className={className} placeholder="Nome de Usuário" onChange={onChange}/>
            <Input name="email" type="text" className={className} placeholder="Email" onChange={onChange}/>
            <Input name="password" type="password" className={className} placeholder="Senha" onChange={onChange} />
            <Input name="confirmPassword" type="password" className={className} placeholder="Confirmar senha" onChange={onChange}/>

            <Button text='Cadastre-se' type="button" className="btn-form" onClick={handleSubmitRegistry} disabled={loading === true || !validatorInput()}/>
            
        </form>

    );
};