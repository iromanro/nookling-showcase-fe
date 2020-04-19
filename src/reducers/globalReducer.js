import setAuthorizationToken from '../utils/setAuthorizationToken'
import _ from 'underscore'
import localStorage from 'store'
import jwt from 'jsonwebtoken'

const globalReducer = (
  state = {
    user: {},
    toastMsg: "",
    toastErr: false,
  },
  action,
) => {
  switch (action.type) {
    case 'USER_LOGIN_PENDING': {
      return {
        ...state,
      };
    }
    case 'USER_LOGIN_REJECTED': {
      console.log("LOGIN FAILED")
      return {
        ...state,
      };
    }
    case 'USER_LOGIN_FULFILLED': {
      console.log("login: ", action);
      setAuthorizationToken(action.payload.data.jwt)
      var userToken = jwt.decode(action.payload.data.jwt)
      localStorage.set('jwt', action.payload.data.jwt)

      let userState = {
        isAuthenticated: true,
        username: userToken.username,
        discriminator: userToken.discriminator,
      }

      return {
        ...state,
        user: userState,
      };
    }
    case 'SET_CURRENT_USER': {
      console.log("SET USER ACTION: ", action);
      let userState = {
        isAuthenticated: true,
        username: userToken.username,
        discriminator: userToken.discriminator,
      }
      return {
        ...state,
        user: action.user,
        toastErr: false,
        toastMsg: "Logged in successfully!"
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
