import { loginDetails } from './initialState';
import * as t from './actionTypes';

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
      case t.SET_TOKEN:
          return{
              ...state,
              ...action,
              token:action.payload.token
          }
  
    default:
      return state;
  }
};