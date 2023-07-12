import { api } from "./Api"

export const fetchPostsForFeed = async (username, page) => {
    try {
        const response =  await api.get(`/feed/${username}?size=6&page=${page}`);
        return response.data.content;
    }
    catch(err) {
        console.log(err);
    }
}