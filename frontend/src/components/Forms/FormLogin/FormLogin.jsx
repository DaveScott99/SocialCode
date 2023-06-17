import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Button } from "../../Generics/Button/Button";
import { Form } from "./FormLoginStyles";
import { validateEmail, validatePassword } from "../../../utils/Validators";
import Input from "../../Generics/Input/Input";

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

    const validatorInput = () => {
        return validateEmail(loginUser.email)
            && validatePassword(loginUser.password)
    }

    return(
        <Form >

            <Input name="email" type="email" placeholder="Email" onChange={onChange}/>
            <Input name="password" type="password" placeholder="Senha" onChange={onChange} />

            <Button 
                type="button"
                onClick={handleSubmitLogin}
                width="100"
                fontSize="1"
                padding="10"
                borderradius="5"
                fontWeight="bold"
                justify="center"
                disabled={!validatorInput()}
            > 
                Entrar
            </Button>
        </Form>
    );
};