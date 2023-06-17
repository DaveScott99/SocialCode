import React from "react";
import { findAllPostsByUser, findUserByUsername } from "../../../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../../Generics/Container/Container";
import UserInfo from "../UserInfo/UserInfo";

import './CardUserProfile.css';
import Feed from "../../Feed/Feed";
import Repositories from "../Repositories/Repositories";

export default function CardUserProfile({ username }) {

    const [currentUser, setCurrentUser] = useState();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const user = await findUserByUsername(username);
            const posts = await findAllPostsByUser(user.data.id);
            setCurrentUser(user.data);
            setPosts(posts.data);
        }
        loadData();
    }, [username])

    if (!currentUser) return null;

    return (
        <Container className="user-profile-container">

            <section className="user-profile-card">

                <article className="user-info">
                        
                    <UserInfo userData={currentUser} />
                       
                </article>
            </section>

            <section className="activity-user">

                <div className="user-projects">
                    <Repositories gitHubUsername={currentUser.gitHubLink}/>
                </div>

                <div className="user-posts">
                    <div className="label"> 
                        <span>Atividade</span>
                    </div>
                    <Feed postsData={posts} />
                </div>

            </section>
        </Container>
    );
}