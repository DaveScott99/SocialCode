import React, { useEffect, useState } from "react";

import { BsShare } from "react-icons/bs"
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai"

import './Post.css'
import PostService from "../../services/PostService";

const postService = new PostService();

export default function Post({ postData }){

        /* useState para armazenar os posts que vem da API */
        const [posts, setPost] = useState([]);

        /* Função para resgatar os POSTS da API e alocar no useState */
        const getPosts = async () => {
            const data = await postService.findAll();
            setPost(data);
        }
    
        /* Função que executará o carregamento do posts sempre que recarregar a página */
        useEffect(() => {
            getPosts();
        }, [])

    return (
        <div className="container-post">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <div className="header-post">

                        <div className="user-data">
                            <img src={post.user.userImg} alt=""  className="user-image"/>

                            <div className="user-texts">
                                <span className="user-name">{post.user.name} </span>
                                <span className="post-date">{post.instant}</span>
                            </div>

                        </div>

                    </div>  

                    <div className="img-post">
                    <img src={post.coverImg} alt="Imagem do POST" />
                    </div>

                    <div className="footer-post">
                        <span><AiOutlineHeart /></span>
                        <span><BiCommentDetail /></span>
                        <span><BsShare /></span>
                    </div>
                </div>
        
                ))
            }
        </div>
    );
};