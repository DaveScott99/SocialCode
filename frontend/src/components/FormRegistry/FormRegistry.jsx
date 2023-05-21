import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../../services/UserService";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "../../utils/Validators";
import Input from "../Input/Input";
import Button from "../Button/Button";

const userService = new UserService();

export default function FormRegistry({ className }) {
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

    const handleSubmitRegistry =  async (event) => {
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
                        navigate('/');
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

        <form className="form-credentials" >
            
            <Input name="name" type="text" className={className} placeholder="Nome" onChange={onChange}/>
            <Input name="email" type="email" className={className} placeholder="Email" onChange={onChange}/>
            <Input name="password" type="password" className={className} placeholder="Senha" onChange={onChange} />
            <Input name="confirmPassword" type="password" className={className} placeholder="Confirmar senha" onChange={onChange}/>

            <Button text='Cadastre-se' type="submit" className="btn-form" onClick={handleSubmitRegistry} disabled={loading === true || !validatorInput()} />
            
        </form>

    );
};