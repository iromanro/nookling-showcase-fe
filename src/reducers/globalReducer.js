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
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'USER_LOGIN_FULFILLED': {
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
    case 'GOOGLE_AUTH_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'GOOGLE_AUTH_REJECTED': {
      console.log("GOOGLE REJECTED: ", action.payload.code)
      let errMsg = ""

      if (action.payload.code === "auth/web-storage-unsupported") {
        errMsg = "3rd Party cookies are disabled. Try logging in on a non-private window"
      }

      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: errMsg,
      }
    }
    case 'GOOGLE_AUTH_FULFILLED': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'AUTH_GOOGLE_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'AUTH_GOOGLE_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: "Unable to authorize Google user. Please try again later!"
      }
    }
    case 'AUTH_GOOGLE_USER_FULFILLED': {
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
    case 'USER_EMAIL_REGISTRATION_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'USER_EMAIL_REGISTRATION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: "Unable to register. Please try again later."
      }
    }
    case 'USER_EMAIL_REGISTRATION_FULFILLED': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'USER_EMAIL_CREATION_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'USER_EMAIL_CREATION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: "Unable to register. Please try again later."
      }
    }
    case 'USER_EMAIL_CREATION_FULFILLED': {
      setAuthorizationToken(action.payload.data.jwt)
      var userToken = jwt.decode(action.payload.data.jwt)
      localStorage.set('jwt', action.payload.data.jwt)

      let userState = {
        isAuthenticated: true,
        username: action.payload.data.username,
      }

      return {
        ...state,
        isLoading: false,
        user: userState,
        toastMsg: "Account created successfully!"
      }
    }
    case 'USER_EMAIL_LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'USER_EMAIL_LOGIN_REJECTED': {
      console.log("Error: ", action.payload.code)
      let errMsg = "";
      if (action.payload.code === "auth/user-not-found") {
        errMsg = "Incorrect email/password. Please try again!"
      }

      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: errMsg,
      }
    }
    case 'USER_EMAIL_LOGIN_FULFILLED': {
      console.log("Action: ", action.payload)
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'AUTH_EMAIL_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'AUTH_EMAIL_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        toastErr: true,
        toastMsg: "Unable to authenticate user!"
      }
    }
    case 'AUTH_EMAIL_USER_FULFILLED': {
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
      if(action.user.uuid == null) {
        return {
          isLoading: false,
          ...state,
          user: {
            isAuthenticated: false,
          },
          settings: {},
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
