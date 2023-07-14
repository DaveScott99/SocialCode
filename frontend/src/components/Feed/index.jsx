import React, { useContext } from "react";
import { FeedContainer } from "./styles";
import { CardPost } from "../Post/CardPost";

export default function Feed({ postsData }) {

    return (
        <FeedContainer>

            {postsData?.map((post, index) => {
                return (
                    <CardPost post={post} index={index} key={post.id}/> 
                )})
            }

        </FeedContainer>
    );
};