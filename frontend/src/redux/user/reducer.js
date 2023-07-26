import UserActionTypes from "./action-types";

const initialState = {
  currentUser: null,
  isFollowing: false,
  postsCurrentUser: [],
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
      };

    case UserActionTypes.SET_FOLLOWING:
      return { ...state, isFollowing: action.payload };

    case UserActionTypes.FETCH_POSTS_USER:
      return {
        ...state,
        postsCurrentUser: [...state.postsCurrentUser, ...action.payload],
      };

    default:
      return state;
  }
};

export default userReducer;
