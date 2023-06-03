import React from "react";
import Timeline from "../Timeline/Timeline";
import { findAllPostsByUser, findUserByUsername } from "../../services/Api";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../Button/Button";
import Container from "../Container/Container";

import './CardUserProfile.css';
import UserAvatar from "../UserAvatar/UserAvatar";

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
                    <img src="https://scontent.fcgh5-1.fna.fbcdn.net/v/t1.6435-9/207502431_2967404436861000_8283901774150802623_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeFz-AD1EZaRwPnegS73tUrVndBkbHXZYQCd0GRsddlhADT1_gxeW1U9hQKfyg-TedjAbmC1GiNU7oKAwuo7aold&_nc_ohc=JppIU_91iqQAX9y8K6c&_nc_ht=scontent.fcgh5-1.fna&oh=00_AfDJEAxjODKYs_K77GobiQsRzjLQYpmaY-WSIH7TxhFACA&oe=64A06370" alt="" />
                </div>

                <article className="user-info">

                    <UserAvatar className="user-avatar" userImage={currentUser.userImg} sx={{ width: 250, height: 250 }} variant="rounded" />

                    <div className="user-profile-details">

                        <div className="user-stats">
                            <div className="name-and-button">
                                <span className="name">{currentUser.firstName} {currentUser.lastName}</span>
                                <Button type="button" text="Editar perfil" className="btn" />
                            </div>

                            <span className="username">{currentUser.username}</span>
                            <span className="biography">{currentUser.biography}</span>
                            
                            <div className="statistics">
                                <div className="followers">
                                    <span className="followers-count">0</span>
                                    <span className="followers-label"> Seguidores</span>
                                </div>
                                <div className="projects">
                                    <span className="followers-count">0</span>
                                    <span className="followers-label"> Projetos</span>
                                </div>
                            </div>
                        </div>
                       
                        
                        <div className="user-badges">
                            <div className="badges">
                                <div className="badge">

                                </div>
                                <div className="badge">

                                </div>
                                <div className="badge">

                                </div>
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