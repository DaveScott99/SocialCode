import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import postReducer from "./post/reducer";
import videoReducer from "./video/reducer";

const rootReducer  = combineReducers({ userReducer, postReducer, videoReducer });

export default rootReducer;