import axios from 'axios';
import localStorage from 'store';
import store from './store';
import { userLogout } from './actions/globalAction';

axios.interceptors.request.use((config) => {
  const jwt = localStorage.get('jwt');
  const newConfig = config;

  if (jwt) {
    const bearer = `Bearer ${jwt}`;
    newConfig.headers.common.Authorization = bearer;

    return newConfig;
  } else {
    delete newConfig.headers.common.Authorization;

    return newConfig;
  }
});

axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.log(error);
  if (error.response && error.response.status === 403) {
    console.log("We hit a 403");
    store.dispatch(userLogout());
  }

  return Promise.reject(error);
});