import { fetchPosts } from "../redux/post/actions";
import { api } from "./Api"

export const fetchPostsForFeed = async (username, page, dispatch) => {
    try {
        const response =  await api.get(`/feed/${username}?size=6&page=${page}`);
    
        //dispatch(fetchPosts(response.data.content));

        return response.data.content;
    }
    catch(err) {
        console.log(err);
    }
}