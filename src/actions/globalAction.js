import history from '../history'
import axios from 'axios'
import localStorage from 'store'
import setAuthorizationToken from '../utils/setAuthorizationToken'

export function confirmAuth(code) {
  return dispatch => dispatch({
    type: 'USER_LOGIN',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/v1/auth/discord`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        code,
      },
    })
  })
}

export function userLogout() {
  return dispatch => {
    localStorage.remove('jwt')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function setCurrentUser(user) {
  return dispatch => dispatch({
    type: 'SET_CURRENT_USER',
    user,
  });
}