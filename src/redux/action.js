import * as t from './actionTypes';
import { LoginUrl } from '../constants/Api';

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

const setLoginToken = (token) => {
    return {
      type: t.SET_TOKEN,
      payload: token,
    };
  };

