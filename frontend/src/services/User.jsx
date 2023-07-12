import { api } from "./Api";

export const verifyIsFollowing = async (usernameSource, followerUsername) => {
    try {
        const response =  await api.get(`followers/isFollowing/${usernameSource}/${followerUsername}`);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}