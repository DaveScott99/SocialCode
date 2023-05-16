import React from "react";
import UserService from "../services/UserService";

const userService = new UserService();

const ProtectedRoutes = ({children}) => {
    const authenticatedUser = userService.authenticatedUser()
    return authenticatedUser ? children : <h1>Faça Login primeiro</h1>
}

export default ProtectedRoutes;