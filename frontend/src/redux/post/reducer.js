import PostActionTypes from "./action-types";

const initialState = {
  postsFeed: [],
  currentPage: 0,
  totalPages: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, postsFeed: [...state.postsFeed, ...action.payload] };

    case PostActionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPage:
          state.currentPage < state.totalPages
            ? state.currentPage + action.payload
            : state.currentPage,
      };

    case PostActionTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
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
      const postBeforeComent = state.postsFeed.map((post) =>
        post.id === action.payload.postId
          ? { ...post, coments: [...post.coments, action.payload.coment] }
          : post
      );
      return { ...state, postsFeed: postBeforeComent };

    default:
      return state;
  }
};

export default postReducer;
