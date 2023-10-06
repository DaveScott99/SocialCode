import PostActionTypes from "./action-types";

const initialState = {
  postsFeed: [],
  currentPost: null,
  comentsCurrentPost: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.SELECT_POST:
      return { ...state, currentPost: action.payload };

    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, postsFeed: [...state.postsFeed, ...action.payload] };

    case PostActionTypes.FETCH_COMENTS_CURRENT_POST:
      return {
        ...state,
        comentsCurrentPost: [...state.comentsCurrentPost, ...action.payload],
      };

    case PostActionTypes.RESET_POSTS:
      return {
        ...state,
        postsFeed: [],
      };

    case PostActionTypes.RESET_COMENTS:
      return {
        ...state,
        comentsCurrentPost: [],
      };

    case PostActionTypes.VOTE_POST:
      const postsBeforeVote = state.postsFeed.map((post) =>
        post.id === action.payload.postId
          ? { ...post, votesCount: action.payload.newVotes, votedByUser: true }
          : post
      );
      return { ...state, postsFeed: postsBeforeVote };

    case PostActionTypes.UNVOTE_POST:
      const postsBeforeUnvote = state.postsFeed.map((post) =>
        post.id === action.payload.postId
          ? { ...post, votesCount: action.payload.newVotes, votedByUser: false }
          : post
      );
      return { ...state, postsFeed: postsBeforeUnvote };

    case PostActionTypes.PUBLISH_POST:
      return {
        ...state,
        postsFeed: [...state.postsFeed, action.payload],
      };

    case PostActionTypes.NEW_COMENT:
      return {
        ...state,
        comentsCurrentPost: [...state.comentsCurrentPost, action.payload],
      };

    default:
      return state;
  }
};

export default postReducer;
