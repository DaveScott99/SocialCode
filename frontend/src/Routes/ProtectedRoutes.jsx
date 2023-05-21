import React from "react";
import UserService from "../services/UserService";
import Authentication from "../pages/Authentication/Authentication";

const userService = new UserService();

const ProtectedRoutes = ({ children }) => {
    const authenticatedUser = userService.authenticatedUser()
    return authenticatedUser ? children : <Authentication />
}
export default ProtectedRoutes;