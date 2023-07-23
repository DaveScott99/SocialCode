import UserActionTypes from "./action-types";

const initialState = {
  currentUser: null,
  isFollowing: false,
  postsCurrentUser: [],
  currentPage: 0,
  totalPages: 0,
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
        currentPage: 0,
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
        currentPage:
          state.currentPage < state.totalPages
            ? state.currentPage + action.payload
            : state.currentPage,
      };

    case UserActionTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
