import React, { useEffect, useState } from "react"
import PostService from "../../services/PostService";

import './Card.css';

const postService = new PostService();

export default function Card() {

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
        <>
            {/*Neste trecho de código pegamos a variável do useState que está armazenando os posts
              e listamos na página através do método MAP do axios*/}
            {posts.map((post) => (
                <div className="card" key={post.id}>
                    <div className="img">
                        <img src={post.coverImg} alt="" />
                    </div>

                    <div className="content">
                        <span className="title">{post.title}</span>
                    </div>
                </div>
            ))}
        </>
        
    );
}