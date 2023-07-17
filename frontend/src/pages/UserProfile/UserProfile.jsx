import React from "react";
import { useParams } from "react-router";
import Container from "../../components/Generics/Container/Container";
import Profile from "../../components/User/Profile";

import './UserProfile.css'

export default function UserProfile() {

    const { username } = useParams();

    return(
        <Container className="user-profile"> 
            <Profile username={username}/>
        </Container>
    );
};