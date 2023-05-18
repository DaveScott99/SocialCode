import React from "react"

import './CardDashPosts.css';

export default function CardDashPosts({ posts }) {

    return (
        <>
            {/*Neste trecho de código pegamos a variável do useState que está armazenando os posts
              e listamos na página através do método MAP do axios*/}
            {posts.map((post) => (
                <div className="cardDashPosts" key={post.id}>
                    <div className="img-cardDashPosts">
                        <img src={post.coverImg} alt="" />
                    </div>

                    <div className="content-cardDashPosts">
                        <span className="title-cardDashPosts">{post.title}</span>
                    </div>
                </div>
            ))}
        </>
        
    );
}