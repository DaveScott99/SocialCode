import React, { useEffect, useState } from "react";
import FormNewPost from "../../components/FormNewPost/FormNewPost";
import Table from "../../components/Table/Table";
import PostService from "../../services/PostService";

import './DashboardPosts.css'

const postService = new PostService();

export default function DashboardPosts() {

    const [btnSave, setBtnSave] = useState(true);
    const [listPosts, setListPosts] = useState([]);
    const [post, setPost] = useState({
        title: '',
        coverImg: '',
        body: '',
        user: {
            id: localStorage.getItem("id")
        }
    });

    /*Função para resgatar o oque foi digitado pelo usuário nos INPUTS, referenciando
    sempre pelo NAME do input e o seu valor */
    const onChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value})
    }

    const getPosts = async () => {
        const data = await postService.findPostsByUserId(localStorage.getItem("id"));
        setListPosts(data);
    }

    const insertPost = async () => {
        const data = await postService.insert(post);
        console.log(data);
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="dashboard-posts">
            <FormNewPost btn={btnSave} onChange={onChange} insertPost={insertPost}/>
            <Table posts={listPosts} />
        </div>

    );
};