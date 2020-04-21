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

export function getUserSettings() {
  return dispatch => dispatch({
    type: 'GET_USER_SETTINGS',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/v1/settings`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export function updateUserSettings(settings) {
  console.log("Settings: ", settings)
  return dispatch => dispatch({
    type: 'UPDATE_USER_SETTINGS',
    payload: axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/api/v1/settings`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        settings,
      }
    })
  })
}

export function clearToast() {
  return dispatch => dispatch({
    type: 'CLEAR_TOAST',
  });
}