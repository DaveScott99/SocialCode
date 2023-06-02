import { Avatar } from "@mui/material";
import React from "react";

export default function UserAvatar({ className, userImage, sx, variant }) {
    return(
        <div className={className}>
            <Avatar alt="User avatar" src={userImage} sx={sx} variant={variant} />
        </div>
    );
};