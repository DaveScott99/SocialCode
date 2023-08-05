import VideoActionTypes from "./action-types";

export const saveCurrentTime = (payload) => ({
  type: VideoActionTypes.SAVE_CURRENT_TIME,
  payload,
});

export const nextVideo = (payload) => ({
  type: VideoActionTypes.NEXT_VIDEO,
  payload
});