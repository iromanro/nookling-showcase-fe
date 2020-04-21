import setAuthorizationToken from '../utils/setAuthorizationToken'
import localStorage from 'store'
import jwt from 'jsonwebtoken'

const globalReducer = (
  state = {
    user: {
      isAuthenticated: false,
    },
    isLoading: false,
    toastMsg: "",
    toastErr: false,
  },
  action,
) => {
  switch (action.type) {
    case 'USER_LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'USER_LOGIN_REJECTED': {
      console.log("LOGIN FAILED")
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        user: userState,
        toastErr: false,
        toastMsg: "Logged in successfully!",
      };
    }
    case 'SET_CURRENT_USER': {
      console.log("SET USER ACTION: ", action.user);
      
      if(action.user.uuid == null) {
        console.log("Clearing user: ")
        return {
          isLoading: false,
          ...state,
          user: {
            isAuthenticated: false,
          },
          toastErr: false,
          toastMsg: "Logged out successfully!",
        };
      } else {
        console.log("Resetting user")
        let userState = {
          isAuthenticated: true,
          username: action.user.username,
          discriminator: action.user.discriminator,
        }

        return {
          ...state,
          isLoading: false,
          user: userState,
        };
      }
    }
    case 'GET_USER_SETTINGS_PENDING': {
      return {
        isLoading: true,
        ...state,
      };
    }
    case 'GET_USER_SETTINGS_REJECTED': {
      return {
        isLoading: false,
        ...state,
      };
    }
    case 'GET_USER_SETTINGS_FULFILLED': {
      console.log("Action: ", action.payload.data)
      return {
        isLoading: false,
        ...state,
        settings: action.payload.data.settings,
      };
    }
    case 'UPDATE_USER_SETTINGS_PENDING': {
      return {
        isLoading: true,
        ...state,
      };
    }
    case 'UPDATE_USER_SETTINGS_REJECTED': {
      return {
        isLoading: false,
        ...state,
      };
    }
    case 'UPDATE_USER_SETTINGS_FULFILLED': {
      console.log("Action: ", action.payload.data)
      return {
        isLoading: false,
        ...state,
        settings: action.payload.data.settings,
        toastMsg: "Settings updated successfully!"
      };
    }
    case 'CLEAR_TOAST': {
      return {
        ...state,
        toastMsg: "",
        toastErr: false,
      }
    }
    default:
      return state;
  }
};

export default globalReducer;
