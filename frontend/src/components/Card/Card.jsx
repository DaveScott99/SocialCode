
import React, { useEffect, useState } from "react"
import PostService from "../../services/PostService";

import './Card.css';
import axios from "axios";

const postService = new PostService();

export default function Card() {

    const [posts, setPost] = useState([]);

    const getPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/post");

            const data = response.data;

            setPost(data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
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