import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

export default Store =createStore(reducers,{},applyMiddleware(thunk))