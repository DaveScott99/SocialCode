import React, { useEffect, useState } from "react"
import PostService from "../../services/PostService";

import './Card.css';

const postService = new PostService();

const posts = [
    {
        id: 1,
        title: "Post sobre Javascript",
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    },
    {
        id: 2,
        title: "Post sobre Java",
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    },
    {
        id: 3,
        title: "Post sobre Javascript",
        coverImg: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BPSx-c--z6r7tY29L19ukQ.png"
    }
]

export default function Card( customStyleCard ) {

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
        <>
            {/*Neste trecho de código pegamos a variável do useState que está armazenando os posts
              e listamos na página através do método MAP do axios*/}
            {posts?.map((post) => (
                <div className="card" id={customStyleCard} key={post.id}>
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