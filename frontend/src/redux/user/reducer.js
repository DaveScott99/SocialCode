import UserActionTypes from "./action-types";

const initialState = {
  currentUser: null,
  isFollowing: false,
  postsCurrentUser: [],
  currentPagePostsUser: 0,
  totalPagesPostsUser: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UserActionTypes.SELECT:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.RESET_POSTS_CURRENT_USER:
      return {
        ...state,
        postsCurrentUser: [],
        currentPagePostsUser: 0,
      };

    case UserActionTypes.SET_FOLLOWING:
      return { ...state, isFollowing: action.payload };

    case UserActionTypes.FETCH_POSTS_USER:
      return {
        ...state,
        postsCurrentUser: [...state.postsCurrentUser, ...action.payload],
      };

    case UserActionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPagePostsUser:
          state.currentPagePostsUser < state.totalPagesPostsUser
            ? state.currentPagePostsUser + action.payload
            : state.currentPagePostsUser,
      };

    case UserActionTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPagesPostsUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
