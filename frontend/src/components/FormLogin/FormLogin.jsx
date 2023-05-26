import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function FormLogin({ className }) {

    const { login } = useContext(AuthContext);

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

    const handleSubmitLogin = () => {
        login(loginUser.email, loginUser.password); // Integração com o contexto de Auth / api
    }

    return(
        <form className="form-credentials" >

            <Input name="email" type="email" className={className} placeholder="Email" onChange={onChange}/>
            <Input name="password" type="password" className={className} placeholder="Senha" onChange={onChange} />

            <Button text='Entrar' type="button" className="btn-form" onClick={handleSubmitLogin} />

        </form>
    );
};