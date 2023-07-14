import PostActionTypes from "./action-types";

const initialState = {
  postsFeed: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case PostActionTypes.FETCH_POSTS_SUCCESS:
      const postsWithVotedByUser = action.payload.map((post) => ({
        ...post,
        votedByUser: false,
      }));
      return { ...state, postsFeed: postsWithVotedByUser };

    case PostActionTypes.VOTE_POST:
      const postsBeforeVote = state.postsFeed.map((post) =>
        post.id === action.payload.postId ? { ...post, votesCount: action.payload.newVotes, votedByUser: true } : post
      );
      return { ...state, postsFeed: postsBeforeVote };

    case PostActionTypes.UNVOTE_POST:  
      const postsBeforeUnvote = state.postsFeed.map((post) => 
        post.id === action.payload.postId ? { ...post, votesCount: action.payload.newVotes, votedByUser: false} : post
      )
      return { ...state, postsFeed: postsBeforeUnvote }

    default:
      return state;
  }
};

export default postReducer;
