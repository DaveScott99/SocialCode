import React from "react";
import UserService from "../services/UserService";
import UnauthorizedRequest from "../pages/UnauthorizedRequest/UnauthorizedRequest";

const userService = new UserService();

const ProtectedRoutes = ({ children }) => {
    const authenticatedUser = userService.authenticatedUser()
    return authenticatedUser ? children : <UnauthorizedRequest />
}
export default ProtectedRoutes;