import PostActionTypes from "./action-types";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS_SUCESS:
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};

export default postReducer;
