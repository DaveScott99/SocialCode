import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { validateTextPost } from "../../utils/Validators";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { publishPost } from "../../services/Api";

import './NewPost.css';

export default function NewPost() {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
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
        await publishPost(post);
    }

    const validatorInput = () => {
        return validateTextPost(post.body);
    }

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