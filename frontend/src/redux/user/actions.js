import UserActionTypes from "./action-types";

export const selectUser = (payload) => ({
  type: UserActionTypes.SELECT,
  payload,
});

export const setIsFollowing = (payload) => ({
  type: UserActionTypes.SET_FOLLOWING,
  payload,
});

export const fetchPostsUserToRedux = (payload) => ({
  type: UserActionTypes.FETCH_POSTS_USER,
  payload,
});

export const resetCurrentUserPosts = () => ({
  type: UserActionTypes.RESET_POSTS_CURRENT_USER
});

