import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io"
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

import './Timeline.css'

export default function Timeline({ postsData }){

        const [liked, setLiked] = useState(true);
        const [likes, setLikes] = useState(0);

        const clickLike = () => {
            setLiked(!liked);
            if (liked) {
                setLikes(likes + 1);
            }
            else {
                setLikes(likes - 1);
            }

        }

    return (
        <div className="container-post">

            {postsData.map((post) => (
                <div className="post" key={post.id}>
                    
                    <div className="header-post">

                        <div className="user-data">
                            <img src={post.user.userImg} alt=""  className="user-image"/>

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
                            <div className="center-box" onClick={clickLike}>
                                { 
                                    liked
                                        ?
                                        <AiOutlineHeart className="icon-interaction" />
                                        :
                                        <AiFillHeart className="icon-interaction" />
                                } { likes }
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
        
                ))
            }
        </div>
    );
};