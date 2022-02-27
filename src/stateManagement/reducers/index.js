import { combineReducers } from "redux";
import React from "react";
import loginDataReducer from "./loginDataReducer";


const reducers=combineReducers({
    insertData:loginDataReducer
});

export default reducers;


