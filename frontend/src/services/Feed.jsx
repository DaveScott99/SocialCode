import { api } from "./Api"

export const fetchPostsForFeed = async (username, page) => {
    try {
        const response =  await api.get(`/feed?username=${username}&page=${page}`);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const upVotePost = async (postId, userId) => {
    try {
      return await api.post(`/posts/relevantVote?postId=${postId}&userId=${userId}`);
    } catch (err) {
      console.log(err);
    }
};

export const downVotePost = async (postId, userId) => {
    try {
        return await api.post(`/posts/unrelevantVote?postId=${postId}&userId=${userId}`);
    } catch (err) {
        console.log(err);
    }
};
  