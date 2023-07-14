import PostActionTypes from "./action-types";

export const fetchPostsFeedToRedux = (payload) => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload,
});

export const votePost = (postId, newVotes) => ({
  type: PostActionTypes.VOTE_POST,
  payload: { postId, newVotes },
});

export const unvotePost = (postId, newVotes) => ({
  type: PostActionTypes.UNVOTE_POST,
  payload: { postId, newVotes }
})