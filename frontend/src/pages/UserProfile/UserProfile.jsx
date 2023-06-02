import React from "react";

import './UserProfile.css'
import CardUserProfile from "../../components/CardUserProfile/CardUserProfile";
import { useParams } from "react-router";

export default function UserProfile() {

    const { username } = useParams();

    return(
        <div className="user-profile-container"> 
            <CardUserProfile username={username}/>
        </div>
    );
};