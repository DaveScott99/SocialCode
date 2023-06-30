import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../../Generics/Container/Container";
import UserInfo from "../UserInfo/UserInfo";

import './CardUserProfile.css';
import Feed from "../../Feed/Feed";
import Repositories from "../Repositories/Repositories";
import { findAllPostsByUser, findUserByUsername, findUserFollowers, findUserFollowing } from "../../../services/Api";

export default function CardUserProfile({ username }) {

    const [currentUser, setCurrentUser] = useState();
    const [posts, setPosts] = useState([]);
    const [userFollowing, setUsersFollowing] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await findUserByUsername(username);
            const posts = await findAllPostsByUser(data.id);

            const following = await findUserFollowers(data.id);
            const followers = await findUserFollowing(data.id);

            setCurrentUser(data);
            setPosts(posts.data.content);

            setUsersFollowing(following.data);

            setUserFollowers(followers.data);
        }
        loadData();
    }, [username])

    if (!currentUser) return null;

    return (
        <Container className="user-profile-container">

            <section className="user-profile-card">

                <article className="user-info">
                        
                    <UserInfo userData={currentUser} followers={userFollowers} following={userFollowing} />
                       
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