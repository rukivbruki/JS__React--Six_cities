import axios from 'axios';
import history from "./utils/history";
import {ActionCreator as AuthorizationActionCreator} from "./reducers/user/user";

const BASE_URL = `https://es31-server.appspot.com/six-cities`;

const onLoginFail = (response, store) => {
  if (response && response.config.url !== `${BASE_URL}/login`) {
    history.push(`/login`);
    store.dispatch(AuthorizationActionCreator.setAuthorizated(false));
  }
};

export const createAPI = (store) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onFail = (error) => {
    if (error.response && error.response.status === 403) {
      onLoginFail(error.response, store);
    }
    return Promise.reject(error);
  };
  api.interceptors.response.use(undefined, onFail);

  return api;
};
