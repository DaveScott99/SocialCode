import React from "react";
import Container from "../../Generics/Container/Container";
import UserInfo from "../UserInfo/UserInfo";

import './CardUserProfile.css';
import Feed from "../../Feed/Feed";
import Repositories from "../Repositories/Repositories";
import { api } from "../../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../../../redux/user/actions";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../Generics/Loading/Loading";
import { useParams } from "react-router";

export default function CardUserProfile() {

    const { username } = useParams();

    const { posts } = useSelector((rootReducer) => rootReducer.userReducer);
    const dispatch = useDispatch();

    const { data, isLoading } = useQuery(
        ["currentUser", username],
        async () => {
          const currentUser = await api
            .get(`/user/findUserByUsername/${username}`);
            
          const currentPosts = await api
            .get(`/post/findPostsByOwner/${currentUser.data.id}`);

          dispatch(loadPosts(currentPosts.data.content));

          return currentUser.data;
        }, {
            staleTime: 1000 * 100
        }
    );

    console.log(posts);

    /*
    useEffect(() => {
        const loadData = async () => {

            const selectedUser = await findUserByUsername(username);
            dispatch(selectUser(selectedUser.data));

            const currentPosts = await findAllPostsByUser(selectedUser.data.id);
            dispatch(loadPosts(currentPosts.data.content));

            const followers = await findUserFollowers(selectedUser.data.id);
            dispatch(loadFollowers(followers.data));

            const following = await findUserFollowing(selectedUser.data.id);
            dispatch(loadFollowing(following.data));

        }
        loadData();
    }, [dispatch, username])

    */

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container className="user-profile-container">

            <section className="user-profile-card">

                <article className="user-info">
                        
                    <UserInfo currentUser={data}/>
                       
                </article>

            </section>

            <section className="activity-user">

                <div className="user-projects">
                    <Repositories gitHubUsername={data.gitHubLink}/>
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