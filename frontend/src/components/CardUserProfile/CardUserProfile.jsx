import React from "react";
import Timeline from "../Timeline/Timeline";
import { findAllPostsByUser, findUserByUsername } from "../../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../Container/Container";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserInfo from "../UserInfo/UserInfo";
import Badge from "../Badge/Badge";
import UserBackgroundImage from "../UserBackgroundImage/UserBackgroundImage";

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

                <div className="user-cover-image">
                    <UserBackgroundImage backgroundImage="https://github.com/vinceliuice/WhiteSur-wallpapers/raw/main/1080p/WhiteSur.png" />
                </div>

                <article className="user-info">

                    <UserAvatar className="user-avatar" userImage={currentUser.profilePhoto} />

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