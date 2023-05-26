import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
})

/* Função que enviará as credenciais de LOGIN para o BACKEND e se caso exista o usuário cadastrado
armazena no localStorage as credenciais*/
export const loginUser = async (email, password) => {
    try {
        return await api.post('/login', { email, password });
    }
    catch (err) {
        console.log(err);
    }
}

 /* Função para registrar um novo usuário na plataforma */
 export const resgisterUser = async (userData) => {
    try {
        return await api.post('/user/insert', { userData });   
    }
    catch (err) {
        const listError = [err.response.data.errors];
        for (var i = 0; i < listError[0].length; i++) {
            toast.warning(listError[0][i].message)
        }
    }
}

export const findUserById = async (id) =>  {
    try {
        return await api.get(`/user/findById/${id}`);
    }
    catch (err) {
        console.log(err);
    }
}

export const findUserByUsername = async (username) => {
    try {
        return await api.get(`/user/findByUsername/${username}`);
    }
    catch (err) {
        console.log(err);
    }
}


// Função para resgatar todos os POSTS que vem do BACKEND
export const FindAllPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('/post/findAll')
            .then(response => setPosts(response.data))
            .catch(err => console.log(err));
    }, [posts])

    return posts;
   
}

export const FindAllPostsByUser = (id) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get(`/post/findPostsByUser/${id}`)
            .then(response => setPosts(response.data))
            .catch(err => console.log(err));
    }, [posts])

    return posts;
}



export const findPostById = async (id) => {
    try {
        return await api.get(`/post/findById/${id}`);
    }
    catch (err) {
        console.log(err);
    }
}

export const publishPost = async (post) => {
    try {
        return await api.post('/post/inserPost', { post });
    }
    catch (err) {
        console.log(err);
    }
}