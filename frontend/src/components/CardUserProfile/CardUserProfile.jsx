import React, { useContext } from "react";
import Timeline from "../Timeline/Timeline";
import { findAllPostsByUser, findUserByUsername } from "../../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../Container/Container";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserInfo from "../UserInfo/UserInfo";
import Badge from "../Badge/Badge";

import './CardUserProfile.css';
import { AuthContext } from "../../contexts/Auth/AuthContext";

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

                <div className="user-cover-image">
                    <img src={currentUser.backgroundImage} alt="" />
                </div>

                <article className="user-info">

                    <UserAvatar className="user-avatar" userImage={currentUser.profilePhoto} sx={{ width: 200, height: 200 }} variant="rounded" />

                    <div className="user-profile-details">

                        <UserInfo userData={currentUser} />
                       
                        <div className="user-badges">
                            <div className="badges">
                                <Badge 
                                    imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                    link={currentUser.gitHubLink} />
                            </div>
                        </div>

                    </div>
                </article>
            </section>

            <section className="activity-user">

                <div className="user-projects">
                    <div className="label"> 
                        <span>Projetos</span>
                    </div>
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