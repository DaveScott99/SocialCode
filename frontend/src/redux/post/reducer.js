import PostActionTypes from "./action-types";

const initialState = {
  postsFeed: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, postsFeed: action.payload };

    case PostActionTypes.VOTE_POST:
      const postsBeforeVote = state.postsFeed.map((post) =>
        post.id === action.payload.postId ? { ...post, votesCount: action.payload.newVotes, votedByUser: true } : post
      );
      return { ...state, postsFeed: postsBeforeVote };

    case PostActionTypes.UNVOTE_POST:  
      const postsBeforeUnvote = state.postsFeed.map((post) => 
        post.id === action.payload.postId ? { ...post, votesCount: action.payload.newVotes, votedByUser: false } : post
      )
      return { ...state, postsFeed: postsBeforeUnvote }

    case PostActionTypes.PUBLISH_POST:
      return {
        ...state, postsFeed: [...state.postsFeed, action.payload] 
      };

    default:
      return state;
  }
};

export default postReducer;
