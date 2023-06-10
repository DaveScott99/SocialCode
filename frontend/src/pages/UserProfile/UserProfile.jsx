import React from "react";
import CardUserProfile from "../../components/User/CardUserProfile/CardUserProfile";
import { useParams } from "react-router";
import Container from "../../components/Generics/Container/Container";

import './UserProfile.css'

export default function UserProfile() {

    const { username } = useParams();

    return(
        <Container className="user-profile"> 
            <CardUserProfile username={username}/>
        </Container>
    );
};