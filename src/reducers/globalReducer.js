import _ from 'underscore';

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
      return {
        ...state,
      };
    }
    case 'USER_LOGIN_FULFILLED': {
      console.log("FULFILLED LOGIN");
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
