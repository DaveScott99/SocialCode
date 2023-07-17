import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginUser } from "../../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const recoveredToken = localStorage.getItem("token");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.common["Authorization"] = recoveredToken;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);

    if (data) {
      const loggedUser = data.user;
      const token = data.token.token;

      api.defaults.headers.common["Authorization"] = token;

      const newPost = {
        title: "",
        body: "",
        owner: {
          id: loggedUser.id,
          username: loggedUser.username,
          profilePhoto: loggedUser.profilePhoto
        },
        languages: [],
        votesCount: 0,
        votedByUser: false,
      }

      localStorage.setItem("current-newPost", JSON.stringify(newPost));
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      setUser(loggedUser);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("current-newPost")
    api.defaults.headers.common["Authorization"] = null;
    setUser(null);
    navigate("/authentication");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
