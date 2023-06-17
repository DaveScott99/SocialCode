import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { FeedContainer } from "./FeedStyles";
import { CardPost } from "../Post/CardPost/CardPost";

export default function Feed({ postsData }) {

    const { user } = useContext(AuthContext);

    return (
        <FeedContainer>

            {postsData.map((post, index) => {

                // Verifica se o usuário deu like em algum determinado post 
                const hasLiked = post.likes && post.likes.some(userLike => userLike.id === user.id);

                return (
                    <CardPost post={post} hasLiked={hasLiked} index={index} key={post.id}/> 
                )})
            }

        </FeedContainer>
    );
};