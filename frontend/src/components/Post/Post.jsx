import React, { useEffect, useState } from "react";

import { BsShare } from "react-icons/bs"
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai"

import './Post.css'
import PostService from "../../services/PostService";

const postService = new PostService();

const posts = [
    {
        id: 1,
        user: {
            userImg: "https://socialcode-storage.s3.sa-east-1.amazonaws.com/users/profile-photo/2023-07-15T01%3A07%3A14.312315500Z.jpg",
            name: "Dave",
        },
        instant: 2,
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    },
    {
        id: 2,
        user: {
            userImg: "https://socialcode-storage.s3.sa-east-1.amazonaws.com/users/profile-photo/2023-07-15T01%3A07%3A14.312315500Z.jpg",
            name: "Dave",
        },
        instant: 2,
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    },
    {
        id: 3,
        user: {
            userImg: "https://socialcode-storage.s3.sa-east-1.amazonaws.com/users/profile-photo/2023-07-15T01%3A07%3A14.312315500Z.jpg",
            name: "Dave",
        },
        instant: 2,
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    },
]

export default function Post({ postData }){

        /* useState para armazenar os posts que vem da API */
        //const [posts, setPost] = useState([]);

        /* Função para resgatar os POSTS da API e alocar no useState */
        const getPosts = async () => {
            //const data = await postService.findAll();
            //setPost(data);
        }
    
        /* Função que executará o carregamento do posts sempre que recarregar a página */
        useEffect(() => {
            getPosts();
        }, [])

    return (
        <div className="container-post">
            {posts?.map((post) => (
                <div className="post" key={post.id}>
                    <div className="header-post">

                        <div className="user-data">
                            <img src={post.user.userImg} alt=""  className="user-image"/>

                            <div className="user-texts">
                                <span className="user-name">{post.user.name} </span>
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