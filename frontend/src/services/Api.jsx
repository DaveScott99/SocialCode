import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const loginUser = async (email, password) => {
  const { data } = await api.post("/login", { email, password });

  if (data.status !== true) {
    toast.error(data.message);
  } else {
    return data;
  }
};

export const resgisterUser = async (userData) => {
  try {
    return await api.post("/users/register", userData);
  } catch (err) {
    const listError = [err.response.data.errors];
    if (listError) {
      for (var i = 0; i < listError[0].length; i++) {
        toast.warning(listError[0][i].message);
      }
    }
  }
};

export const updateUser = async (idUser, userDataUpdate) => {
  try {
    return await api.put(`/users/${idUser}`, userDataUpdate, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUserById = async (id) => {
  try {
    return await api.get(`/users/findById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findUserByUsername = async (username) => {
  try {
    return await api.get(`/users/findUserByUsername/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchUsersByUsername = async (username) => {
  try {
    if (username !== null) {
      return await api.get(`/users/searchUsers?q=${username}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfilePhoto = async (username, photo) => {
  const formData = new FormData();
  formData.append("file", photo);

  try {
    return await api.post(`/users/upload/profilePhoto/${username}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUserFollowers = async (userId) => {
  try {
    return await api.get(`/user/followers/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUserFollowing = async (userId) => {
  try {
    return await api.get(`/user/following/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (followerId, userId) => {
  try {
    return await api.post(`/followers/follow/${followerId}/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (followerId, userId) => {
  try {
    return await api.post(`/followers/unfollow/${followerId}/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findPostByTitle = async (title, username) => {
  try {
    return await api.get(`/posts?title=${title}&user=${username}`);
  } catch (err) {
    console.log(err);
  }
}

export const findPostById = async (id) => {
  try {
    return await api.get(`/posts/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const publishPost = async (post) => {
  try {
    const response = await api.post("/posts", post);
    if (response) {
      return true
    } 
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const publishComentPost = async (coment) => {
  try {
    const response = await api.post("/coments/publishComentPost", coment)

    console.log(response);
    return response;
  }
  catch (err) {
    console.log(err);
  }
};

export const findComentsByPost = async (postId, page) => {

  try {
    const response = await api.get(`/coments/findComentsByPost?postId=${postId}&page=${page}`)
    return response;
  }
  catch(err) {
    console.log(err);
  }

}

export const findLanguages = async () => {
  try {
    const response = await api.get("/languages");
    return response.data.content;
  }
  catch(err) {
    console.log(err);
  }
}



export const findPostsByOwner = async (username, page) => {
  try {
      const response =  await api.get(`/posts/findPostsByOwner?ownerUsername=${username}&page=${page}`);
      return response.data;
  }
  catch(err) {
      console.log(err);
  }
}

export const findAllVideos = async () => {
  try {
    const response = await api.get("/videos");
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}

export const findVideoByFileName = async (fileName) => {
  try {
    const response = await api.get(`/videos/findByFileName?fileName=${fileName}`);
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}

export const updateVideo = async (newVideo, videoId) => {
  try {
    const response = await api.put(`/videos/${videoId}`, newVideo);
    console.log(response);
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}

export const uploadThumbnail = async (thumbnailFile, fileName) => {
  const formData = new FormData();
  formData.append("file", thumbnailFile);

  try {
    const response = await api.post(`/thumbnail?videoFileName=${fileName}`, formData);
    console.log(response.data);
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}

export const findPlaylistsByUser = async (username) => {
  try{
    const response = await api.get(`/playlists?ownerUsername=${username}`);
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}

export const findPlaylistsByName = async (playlistName) => {
  try{
    const response = await api.get(`/playlists/findByName?playlistName=${playlistName}`);
    return response.data;
  }
  catch(err) {
    console.log(err);
  }
}


export const createPlaylist = async (newPlaylist) => {
  try {
    return await api.post("/playlists", newPlaylist);
  }
  catch(err) {
    console.log(err);
  }
}

export const addVideoOnPlaylist = async (playlistName, videoFileName) => {
  try{
    const response = await api.post(`/playlists/addVideo?playlistName=${playlistName}&videoFileName=${videoFileName}`);
    toast.success(response.data.message);
  }
  
  catch(err) {
    toast.error(err.response.data.message);
  }
}