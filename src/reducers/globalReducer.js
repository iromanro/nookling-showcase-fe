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
        toastErr: false,
        toastMsg: "Logged in successfully!",
      };
    }
    case 'SET_CURRENT_USER': {
      console.log("SET USER ACTION: ", action);
      
      if(action.user == {}) {
        return {
          ...state,
          user: {},
          toastErr: false,
          toastMsg: "Logged out successfully!",
        };
      } else {
        let userState = {
          isAuthenticated: true,
          username: action.user.username,
          discriminator: action.user.discriminator,
        }

        return {
          ...state,
          user: userState,
        };
      }
    }
    default:
      return state;
  }
};

export default globalReducer;
