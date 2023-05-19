/*
import React, { useEffect, useState } from "react"
import PostService from "../../services/PostService";

import './Card.css';

const postService = new PostService();

export default function Card( customStyleCard ) {

    return (
        <>
            {/*Neste trecho de código pegamos a variável do useState que está armazenando os posts
              e listamos na página através do método MAP do axios}
            {posts.map((post) => (
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

*/