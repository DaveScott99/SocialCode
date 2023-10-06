import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext"
import { updateUser } from "../../../services/Api";
import TextField from "../../Generics/TextField/TextField";
import { Button } from "../../Generics/Button/Button"

import './ConfigAccount.css';
import { useSelector } from "react-redux";

export default function ConfigAccount() {

    const { user } = useContext(AuthContext);

    const { currentUser } = useSelector(
        (rootReducer) => rootReducer.userReducer
    );   
    
    const [userDetails, setUserDetails] = useState({
        id: currentUser.user_info.id,
        firstName: currentUser.user_info.firstName,
        lastName: currentUser.user_info.lastName,
        username: currentUser.user_info.username,
        title: currentUser.user_info.title,
        gitHubLink: currentUser.user_info.gitHubLink,
        linkedinLink: currentUser.user_info.linkedinLink,
    })

    const handleClickUpdateUser = async () => {
        await updateUser(user.id, userDetails);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(userDetails));
        window.location.reload();
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value});
    }

    return (
        <section className="container-config">

            <article className="card-details-user">

                <main className="user-data">

                    <form className="form-update">
                        <TextField
                            type="text"
                            fieldName="Username"
                            value={userDetails.username}
                            name="username"
                            onChange={onChange}
                        />
                    
                        <TextField
                            type="text"
                            fieldName="Nome"
                            value={userDetails.firstName}
                            name="firstName"
                            onChange={onChange}
                        />

                        <TextField
                            type="text"
                            fieldName="Sobrenome"
                            value={userDetails.lastName}
                            name="lastName"
                            onChange={onChange}
                        />

                        <TextField
                            type="text"
                            fieldName="Titulo"
                            value={userDetails.title}
                            name="title"
                            onChange={onChange}
                        />
                        
                        <TextField
                            type="text"
                            fieldName="GitHub"
                            value={userDetails.gitHubLink}
                            name="gitHubLink"
                            onChange={onChange}
                        />

                        <TextField
                            type="text"
                            fieldName="Linkedin"
                            value={userDetails.linkedinLink}
                            name="linkedinLink"
                            onChange={onChange}
                        />

                    </form>
                    <Button 
                        onClick={handleClickUpdateUser}
                        type="submit" 
                        width="100"
                        fontSize="1"
                        padding="10"
                        borderradius="5"
                        fontWeight="bold"
                        justify="center"
                    > 
                        Salvar
                    </Button>
                </main>
                
            </article>

        </section>
    );
}