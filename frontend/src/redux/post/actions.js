import PostActionTypes from "./action-types";

export const fetchPosts = (payload) => ({
  type: PostActionTypes.FETCH_POSTS_SUCESS,
  payload,
});
