import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService"

import './DashboardUser.css';
import Timeline from "../../components/Timeline/Timeline";

const userService = new UserService()

export default function DashboardUser() {

    const [user, setUser] = useState();

    const findUser = async () => {
       

    }

    useEffect(() => {
        findUser();
    }, [])

    if(!user) return null;

    return (
        <div className="container-profile-user">
            
            <div className="coverImg-user">


            </div>
            
            
            <div className="user-pic">
                <img src={user.userImg} alt="" />
            </div>

            <div className="container-user-details">
                
                <div className="user-details">
                    <span className="name">{user.firstName} {user.lastName}</span>
                    <span className="username">{user.username}</span>

                    <span className="biography">{user.biography}</span>

                    <div className="statistic-user">
                        <div className="posts">
                            <span className="posts-count">0</span>
                            <span className="posts-label">Posts</span>
                        </div>

                        <span className="separator"></span>

                        <div className="followers">
                            <span className="followers-count">0</span>
                            <span className="followers-label">Seguidores</span>
                        </div>

                        <span className="separator"></span>

                        <div className="following">
                            <span className="following-count">0</span>
                            <span className="following-label">Seguindo</span>
                        </div>
                    </div>

                    <div className="activity-user">
                        <div className="label"> 
                            <span>Atividade</span>
                        </div>


                        <Timeline />


                    </div>

                </div>
             
        
            </div>

        </div>

    );
};