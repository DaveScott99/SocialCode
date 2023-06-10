import React from "react";
import Timeline from "../../Timeline/Timeline";
import { findAllPostsByUser, findUserByUsername } from "../../../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../../Generics/Container/Container";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserInfo from "../UserInfo/UserInfo";
import UserRepositories from "../UserRepositories/UserRepositories";

import './CardUserProfile.css';

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

                    <UserAvatar className="user-avatar" userImage={currentUser.profilePhoto} />

                    <UserInfo userData={currentUser} />
                       
                </article>
            </section>

            <section className="activity-user">

                <div className="user-projects">
                    <UserRepositories gitHubUsername={currentUser.gitHubLink}/>
                </div>

                <div className="user-posts">
                    <div className="label"> 
                        <span>Atividade</span>
                    </div>
                    <Timeline postsData={posts} />
                </div>

            </section>
        </Container>
    );
}