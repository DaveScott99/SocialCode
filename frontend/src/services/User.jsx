import { api } from "./Api";


export const fetchProfileUser = async (username, postsPage) => {
    try {
        const response = await api.get(`/users/profile?username=${username}&postsPage=${postsPage}`);
        return response.data
    }
    catch(err) {
        console.log(err);
    }
   
}

export const verifyIsFollowing = async (usernameSource, followerUsername) => {
    try {
        const response =  await api.get(`followers/isFollowing/${usernameSource}/${followerUsername}`);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}