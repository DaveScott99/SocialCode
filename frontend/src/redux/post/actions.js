import PostActionTypes from "./action-types";

export const fetchPostsFeedToRedux = (payload) => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload,
});

export const nextPage = (payload) => ({
  type: PostActionTypes.NEXT_PAGE,
  payload,
});

export const setTotalPages = (payload) => ({
  type: PostActionTypes.SET_TOTAL_PAGES,
  payload,
});

export const publishPostOnRedux = (payload) => ({
  type: PostActionTypes.PUBLISH_POST,
  payload,
})

export const votePost = (postId, newVotes) => ({
  type: PostActionTypes.VOTE_POST,
  payload: { postId, newVotes },
});

export const unvotePost = (postId, newVotes) => ({
  type: PostActionTypes.UNVOTE_POST,
  payload: { postId, newVotes }
})

export const publishNewComent = (postId, coment) => ({
  type: PostActionTypes.NEW_COMENT,
  payload: { postId, coment }
})
