import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./reducer/combineReducer";

export default () => legacy_createStore(combineReducer, {}, applyMiddleware(thunk))