import React, { useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import { validateEmail, validatePassword } from "../../utils/Validators";

const userService = new UserService();

export default function FormLogin({ className }) {

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
                toast.error("Preencha todos os campos")
            }
            else {
                try {
                    // Desabilitar o botão de login
                    setLoading(true);
                    // Enviar as credencias para a API e armazenar a respota na variável
                    const response = await userService.login(loginUser);

                    // Verificar se o usuário está autenticado, se sim é redirecionado para a HOME
                    if (response === true) {
                        toast.success(response.message);
                        navigate('/');
                        window.location.reload();
                    }
                    setLoading(false);
                }
                catch (error) {
                    toast.error("Algo deu errado")
                }
            }

        }

    // Função para validar oque foi digitado nos INPUTS
    const validatorInput = () => {
        return validateEmail(loginUser.email)
            && validatePassword(loginUser.password);
    }

    return(
        <form className="form-credentials" >


            <Input name="email" type="email" className={className} placeholder="Email" onChange={onChange}/>
            <Input name="password" type="password" className={className} placeholder="Senha" onChange={onChange} />

            <Button text='Entrar' type="submit" className="btn-form" onClick={handleSubmitLogin} disabled={loading === true || !validatorInput()} />

        </form>
    );
};