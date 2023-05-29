import React, { useContext } from "react";
import Timeline from "../Timeline/Timeline";

import './CardUserProfile.css'
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { FindAllPostsByUser } from "../../services/Api";
import { Avatar } from "@mui/material";

const CardUserProfile = () => {
    
    const { user } = useContext(AuthContext);
    const posts = FindAllPostsByUser(user.id);

    return (
        <div className="container-profile-user">
                
            <div className="coverImg-user">


            </div>
        
            <div className="user-pic">
                <Avatar className="pic" alt="User image" src={user.userImg} sx={{ width: 150, height: 150 }} />
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
                        <Timeline postsData={posts}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CardUserProfile;