import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext"
import Button from "../../Generics/Button/Button"
import { updateUser } from "../../../services/Api";
import TextField from "../../Generics/TextField/TextField";
import TextArea from "../../Generics/TextArea/TextArea";

import './ConfigAccount.css';

export default function ConfigAccount() {

    const { user } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        title: user.title,
        biography: user.biography,
        profilePhoto: user.profilePhoto,
        backgroundImage: user.backgroundImage,
        gitHubLink: user.gitHubLink,
        linkedinLink: user.linkedinLink,
        instagramLink: user.instagramLink,
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

                    <h2>Editar perfil</h2>
                    
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

                            <TextArea 
                                name="biography"
                                onChange={onChange}
                                fieldName="Bio"
                                valueDefault={userDetails.biography}
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
                    <Button type="button" text="Salvar" className="btn-save" onClick={handleClickUpdateUser}/>
                </main>
                
            </article>

        </section>
    );
}