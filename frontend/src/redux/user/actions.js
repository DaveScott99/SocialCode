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

export const nextPage = (payload) => ({
  type: UserActionTypes.NEXT_PAGE,
  payload,
});

export const setTotalPages = (payload) => ({
  type: UserActionTypes.SET_TOTAL_PAGES,
  payload,
});
