import React from "react"

import './Table.css';
import CardDashPosts from "../CardDashPosts/CardDashPosts";

export default function Table({ posts }) {
    return (
        <>
        <article className="container-posts">
            <h3 className="item nav">Seus Posts</h3>
            <CardDashPosts posts={posts} className="item content"/>
        </article>        
        </>
    )
}