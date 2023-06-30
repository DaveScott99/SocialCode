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
        const data = await loginUser(email, password); // Enviando as informações de login para a API
        
        if (data) {
            const loggedUser = data.user;
            const token = data.token.token;
    
            // Salvando as informações de login no localStorage do navegador
            localStorage.setItem("user", JSON.stringify(loggedUser));
            localStorage.setItem("token", (token.replace("Bearer ", "")));
            
            // Setando o usuário logado no estado global do context
            setUser(loggedUser);
            //navigate("/");
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