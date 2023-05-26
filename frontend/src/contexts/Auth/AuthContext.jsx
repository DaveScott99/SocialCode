import React ,{ createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginUser } from "../../services/Api"
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        userImg: "",
        biography: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lógica para verificar se existe algum usuário logado no sistema
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);

    }, [])

    // Função que irá realizar o login do usuário no sistema
    const login = async (email, password) => {
        const { data } = await loginUser(email, password); // Enviando as informações de login para a API

        console.log(data);
        
        if (data.status === true) {
            const loggedUser = data.user;
            const token = data.user.email;

            //api.defaults.headers.Authorization = `Bearer ${token}`;

            // Salvando as informações de login no localStorage do navegador
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(token));
            
            // Setando o usuário logado no estado global do context
            setUser(loggedUser);
            navigate("/");
        }
        else {
            toast.warning(data.message);
        }
    }

    // Função deslogar o usuário do sistema
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/authentication");
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}> 
            {children}
        </AuthContext.Provider>
    );
}