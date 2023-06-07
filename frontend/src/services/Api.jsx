import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
})

/* Função que enviará as credenciais de LOGIN para o BACKEND e se caso exista o usuário cadastrado
armazena no localStorage as credenciais*/
export const loginUser = async (email, password) => {
    const { data } = await api.post('/login', { email, password });

    if (data.status !== true) {
        toast.error(data.message)
    }
    else {
        return data;
    }
    
}

 /* Função para registrar um novo usuário na plataforma */
 export const resgisterUser = async (userData) => {
    try {
        return await api.post('/user/insert',  userData );
    }
    catch (err) {
        const listError = [err.response.data.errors];
        if (listError) {
            for (var i = 0; i < listError[0].length; i++) {
                toast.warning(listError[0][i].message)
            }
        }
    }
}

export const updateUser = async (idUser, userDataUpdate) => {
    try {
        return await api.put(`/user/updateUser/${idUser}`, userDataUpdate);
    }
    catch (error) {
        console.log(error);
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

export const searchUsersByUsername = async (username) => {
    try {
        if (username !== null) {
            return await api.get(`/user/searchUserByUsername/${username}`);
        }
        return null;
    }
    catch (error) {
        console.log(error);
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

export const uploadProfilePhoto = async (username, photo) => {

    const formData = new FormData();
    formData.append('file', photo);

    try {
        return await api.post(`/user/upload/profile_photo/${username}`, formData);
    }
    catch (error) {
        console.log(error);
    }
}

// Função para resgatar todos os POSTS que vem do BACKEND
export const FindAllPosts = async (page) => {
    try {
      const response = await api.get(`/post/findAll/?size=6&page=${page}`);
      return response.data.content;
    } catch (error) {
      console.log(error);
      return [];
    }
};

export const findAllPostsByUser = async (id) => {
    try {
        return await api.get(`/post/findPostsByUser/${id}`);
    }
    catch (error) {
        console.log(error);
    }
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
        return await api.post('/post/insertPost', post);
    }
    catch (err) {
        console.log(err);
    }
}


export const likePost = async (postId, userId) => {
    try {
        return await api.post(`/post/${postId}/like/${userId}`);
    }
    catch (err) {
        console.log(err);
    }
}