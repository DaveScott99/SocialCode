import React, { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext"
import Input from "../Input/Input";
import Button from "../Button/Button";
import { updateUser } from "../../services/Api";

import './ConfigAccount.css';

export default function ConfigAccount() {

    const { user } = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        biography: user.biography,
        userImg: user.userImg
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
                <aside className="aside-config">
                    Editar perfil
                </aside>

                <main className="user-data">

                    <Avatar className="user-pic" alt="User image" src={user.userImg}/>

                    <form className="form-update">

                        <div className="editable">
                            <label htmlFor="firstName">Nome</label>
                            <Input type="text" name="firstName" className="input-data" onChange={onChange} value={userDetails.firstName}/>

                            <label htmlFor="lastName">Sobrenome</label>
                            <Input type="text" name="lastName" className="input-data" onChange={onChange} value={userDetails.lastName}/>

                            <label htmlFor="biography">Biografia</label>
                            <textarea name="biography" className="input-data" onChange={onChange} value={userDetails.biography}/>
                        </div>

                        <div className="not-editable">

                            <label htmlFor="username">Username</label>
                            <Input type="text" name="username" className="input-data" onChange={onChange} value={userDetails.username} />

                            <label htmlFor="userImg">Imagem de perfil</label>
                            <Input type="text" name="userImg" className="input-data" onChange={onChange} value={userDetails.userImg} />

                            <label htmlFor="email">Email</label>
                            <Input type="text" name="email" className="input-data" disabled value={userDetails.email}/>

                        </div>

                    </form>
                    <Button type="button" text="Salvar" className="btn-save" onClick={handleClickUpdateUser}/>
                </main>
                
            </article>

        </section>
    );
}