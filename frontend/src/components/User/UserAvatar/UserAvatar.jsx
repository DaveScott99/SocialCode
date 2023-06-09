import React from "react";
import { Avatar } from "@mui/material";
import ButtonEditUserAvatar from "../ButtonEditUserAvatar/ButtonEditUserAvatar";

import './UserAvatar.css';

export default function UserAvatar({ className, userImage }) {
    return(
        <div className={className}>
            <div className="container-user-avatar">

                <Avatar className="user-avatar" src={userImage} sx={{width: '200px', height: '200px'}} variant="rounded"/>

                <ButtonEditUserAvatar />

            </div>
        </div>
    );
};