import React, { useContext, useEffect, useState } from "react";
import { IoIosShareAlt } from "react-icons/io"
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { likePost } from "../../services/Api";
import { AuthContext } from "../../contexts/Auth/AuthContext";

import './Timeline.css'
import { Avatar } from "@mui/material";

export default function Timeline({ postsData }) {

    const { user } = useContext(AuthContext);

    const [liked, setLiked] = useState(postsData.map(() => true));
    const [likesCount, setLikesCount] = useState(postsData.map(post => post.likes.length));

    useEffect(() => {
        setLikesCount(postsData.map(post => post.likes.length));
    }, [postsData])

    const clickLike = async (postLiked, index) => {
        setLiked(prevLike => {
            const liked = [...prevLike];
            liked[index] = !liked[index];
            return liked;
        });

        console.log(postLiked.likes.some(userLike => userLike.id === user.id));

        await likePost(postLiked.id, user.id);

        setLikesCount(prevCount => {
            const updatedCount = [...prevCount];
            console.log(updatedCount);
            updatedCount[index] = liked[index] || postLiked.likes.some(userLike => userLike.id === user.id) ? updatedCount[index] - 1 : updatedCount[index] + 1;
            return updatedCount;
        });
    };

    return (
        <div className="container-post">

            {postsData.map((post, index) => {

                // Verifica se o usuário deu like em algum determinado post 
                const hasLiked = post.likes && post.likes.some(userLike => userLike.id === user.id);

                return (
                    <div className="post" key={post.id}>
                        <div className="header-post">

                            <div className="user-data">
                                <Avatar className="user-image" alt="User image" src={post.user.userImg}/>
                                <div className="user-texts">
                                    <span className="user-name">{post.user.username} ·</span>
                                    <div className="post-date">{post.creationDate}</div> 
                                </div>
                            </div>

                        </div>  

                        <div className="text-content-container">
                            <div className="text-contente">
                                { post.body }
                            </div>
                        </div>

                        <div className="img-post">
                            <img src="/"alt="" />
                        </div>

                        <div className="footer-post">

                            <div className="interactios-button">
                                <div className="center-box" onClick={() => { clickLike(post, index) }}>
                                    { 
                                        !liked[index] && hasLiked
                                            ? <AiFillHeart className="icon-interaction" />
                                            : liked[index] && !hasLiked 
                                                    ? <AiFillHeart className="icon-interaction" /> 
                                                    : <AiOutlineHeart className="icon-interaction" />
                                    } { likesCount[index] }
                                </div>

                                <div className="center-box">
                                    <BiCommentDetail className="icon-interaction"/> 0
                                </div>

                                <div className="center-box">
                                    <IoIosShareAlt className="icon-interaction"/>
                                </div>
                            </div>
            
                        </div>
                    </div>
                )})
            }
        </div>
    );
};