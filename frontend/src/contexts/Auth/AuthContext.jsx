import React ,{ createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginUser } from "../../services/Api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);

    }, [])

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        
        if (data) {
            const loggedUser = data.user;
            const token = data.token.token;
    
            localStorage.setItem("user", JSON.stringify(loggedUser));
            localStorage.setItem("token", (token.replace("Bearer ", "")));
            
            setUser(loggedUser);
            navigate("/");
        }

    }

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