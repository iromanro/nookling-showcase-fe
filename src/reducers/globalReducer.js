import setAuthorizationToken from '../utils/setAuthorizationToken';
import _ from 'underscore';
import localStorage from 'store';

const globalReducer = (
  state = {
    user: {},
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
      console.log("LOGIN FAILED");
      return {
        ...state,
      };
    }
    case 'USER_LOGIN_FULFILLED': {
      setAuthorizationToken(action.payload.data.jwt);
      var userToken = jwt.decode(action.payload.data.jwt);
      localStorage.set('jwt', action.payload.data.jwt);

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
    default:
      return state;
  }
};

export default globalReducer;
