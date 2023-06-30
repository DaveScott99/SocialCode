import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
})

/* Função que enviará as credenciais de LOGIN para o BACKEND e se caso exista o usuário cadastrado
armazena no localStorage as credenciais*/
export const loginUser = async (email, password) => {
    const { data } = await api.post('/login', { email, password });

    console.log(data);

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
        return await api.post('/user/register',  userData);
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
        return await api.put(`/user/updateUser/${idUser}`, userDataUpdate, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const findUserById = async (id) =>  {
    try {
        return await api.get(`/user/findById/${id}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const findUserByUsername = async (username) => {
    try {
        return await api.get(`/user/findUserByUsername/${username}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const searchUsersByUsername = async (username) => {
    try {
        if (username !== null) {
            return await api.get(`/user/findUsersByUsername/${username}`, {
                headers : {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
        }
        return null;
    }
    catch (error) {
        console.log(error);
    }
}

export const uploadProfilePhoto = async (username, photo) => {

    const formData = new FormData();
    formData.append('file', photo);

    try {
        return await api.post(`/user/upload/profilePhoto/${username}`, formData, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const findUserFollowers = async (userId) => {
    try {
        return await api.get(`/user/followers/${userId}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const findUserFollowing = async (userId) => {
    try {
        return await api.get(`/user/following/${userId}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const followUser = async (followerId, userId) => {
    try {
        return await api.post(`/user/follow/${followerId}/${userId}`, null, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const unfollowUser = async (followerId, userId) => {
    try {
        return await api.post(`/user/unfollow/${followerId}/${userId}`, null, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

// Função para resgatar todos os POSTS que vem do BACKEND
export const FindAllPosts = async (page, userId) => {
    try {
      const response = await api.get(`/post/findPostsForTimeline?size=6&page=${page}&userId=${userId}`, {
        headers : {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      return response.data.content;
    } catch (error) {
      console.log(error);
      return [];
    }
};

export const findAllPostsByUser = async (id) => {
    try {
        return await api.get(`/post/findPostsByOwner/${id}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const findPostById = async (id) => {
    try {
        return await api.get(`/post/findById/${id}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const publishPost = async (post) => {
    try {
        return await api.post('/post/createPost', post, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const likePost = async (postId, userId) => {
    try {
        return await api.post(`/post/relevantVote/${postId}?userId=${userId}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}