import React ,{ createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginUser } from "../../services/Api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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
        const response = await loginUser(email, password); // Enviando as informações de login para a API

        const loggedUser = response.data.user;
        const token = response.data.user.email;

        // api.defaults.headers.Authorization = `Bearer ${token}`;

        // Salvando as informações de login no localStorage do navegador
        localStorage.setItem("user", JSON.stringify(response.data.user.username));
        localStorage.setItem("token", JSON.stringify(token));

        // Setando o usuário logado no estado global do context
        setUser(loggedUser);
        navigate("/protected");
    }

    // Função deslogar o usuário do sistema
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/authenticated");
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}> 
            {children}
        </AuthContext.Provider>
    );
}