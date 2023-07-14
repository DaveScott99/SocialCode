import { applyMiddleware, createStore } from "redux";
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk';
import logger from "redux-logger";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;