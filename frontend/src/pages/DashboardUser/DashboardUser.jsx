import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService"

import './DashboardUser.css';

const userService = new UserService()

const user = {
    userImg: "https://socialcode-storage.s3.sa-east-1.amazonaws.com/users/profile-photo/2023-07-15T01%3A07%3A14.312315500Z.jpg",
    name: "Davi"
}

export default function DashboardUser() {

    //const [user, setUser] = useState();

    const findUser = async () => {
        //const data = await userService.findUserById(localStorage.getItem('id'));
        //setUser(data);
    }

    useEffect(() => {
        findUser();
    }, [])

    if(!user) return null;

    return (
        <div className="container-profile-user">
            
            <div className="header-profile">

                <div className="image-user">
                    <img src={user.userImg} alt="Imagem usuário" />
                </div>

                <div className="data-user">
                    <div className="header-data-user">
                        <span className="user-name">{user.name}</span>

                        <div className="status-user-account">
                            <span>0 publicações</span>
                            <span>0 seguidores</span>
                            <span>0 seguindo</span>
                        </div>

                    </div>
                    
                    <div className="body-data-user">
                        <span className="name-body-data">{user.name}</span>

                        <span className="bio-body-data">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                              Veniam esse cupiditate beatae temporibus, repellendus officiis 
                              blanditiis exercitationem illo, nostrum eaque quia. Qui consequuntur 
                              recusandae quibusdam a veniam atque quam ipsam.</span>

                        <span>Site</span>
                    </div>

                </div>

            </div>

            <div className="posts-user">
                <p>Posts</p>
            </div>
            
        </div>

    );
};