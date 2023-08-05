import VideoActionTypes from "./action-types";

const initialState = {
  currentVideoTime: 0,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case VideoActionTypes.SAVE_CURRENT_TIME:
      return { ...state, currentVideoTime: action.payload };

    case VideoActionTypes.NEXT_VIDEO:
      return { currentVideoTime: action.payload };

    default:
      return state;
  }
};

export default videoReducer;
