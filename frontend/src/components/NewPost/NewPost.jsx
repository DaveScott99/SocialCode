import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import UserService from "../../services/UserService";
import PostService from "../../services/PostService";
import { validateTextPost } from "../../utils/Validators";

import './NewPost.css';

const userService = new UserService();
const postService = new PostService();

export default function NewPost() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [post, setPost] = useState({
        body: '',
        user: {
            id: localStorage.getItem("id")
        }
    });



    /*Função para resgatar o oque foi digitado pelo usuário nos INPUTS, referenciando
    sempre pelo NAME do input e o seu valor */
    const onChange = (event) => {
        setLoading(false);
        const { name, value } = event.target;
        setPost({ ...post, [name]: value});
    }

    const handleResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    const insertPost = async () => {
        await postService.insert(post);
    }

    const validatorInput = () => {
        return validateTextPost(post.body);
    }

    if(!user) return null;

    return(
        <div className="container-create">
            <div className="header">
                <div className="user-image">
                    <img src={ user.userImg } alt="" />
                </div>
            </div>

            <div className="body">
                <div className="text-area-container">
                    <textarea 
                        name="body" 
                        placeholder="O que está pensando?" 
                        className="text-area" 
                        onChange={onChange} 
                        onInput={handleResize}
                    />
                </div>

                <div className="footer">
                    <div className="footer-container">
                        <Button 
                            type="submit" 
                            text="Criar" 
                            className="button-create"
                            onClick={insertPost} 
                            disabled={loading === true || !validatorInput()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}