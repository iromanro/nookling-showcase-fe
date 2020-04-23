import axios from 'axios'
import localStorage from 'store'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyANpyVpH-yWN3cGZFfL_xzu2LEQXoxaVuM",
  authDomain: "nookling-showcase.firebaseapp.com",
  databaseURL: "https://nookling-showcase.firebaseio.com",
  projectId: "nookling-showcase",
  storageBucket: "nookling-showcase.appspot.com",
  messagingSenderId: "102138940958",
  appId: "1:102138940958:web:d91990cfc6ba015c6be80f",
  measurementId: "G-MK2Q25LDMP"
}

export const myFirebase = firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

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

export function googleAuth() {
  return dispatch => dispatch({
    type: 'GOOGLE_AUTH',
    payload: firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("GOOGLE USER: ", user)
      console.log("GOOGLE TOKEN: ", token)
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        dispatch(authGGoogleUser(idToken, user.email))
      })
    })
  })
}

export function authGGoogleUser(token, email) {
  return dispatch => dispatch({
    type: 'AUTH_GOOGLE_USER',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/v1/auth/google`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        token,
        email,
      },
    })
  })
}

export function userLogin(email, pass) {
  return dispatch => dispatch({
    type: 'USER_EMAIL_LOGIN',
    payload: firebase.auth().signInWithEmailAndPassword(email, pass),
  }).then((response) => {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      dispatch(authEmailUser(idToken))
    })
  })
}

export function authEmailUser(token) {
  return dispatch => dispatch({
    type: 'AUTH_EMAIL_USER',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/v1/auth/email/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        token,
      },
    })
  })
}

export function userRegister(email, pass) {
  return dispatch => dispatch({
    type: 'USER_EMAIL_REGISTRATION',
    payload: firebase.auth().createUserWithEmailAndPassword(email, pass),
  }).then((response) => {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      dispatch(registerEmailUser(idToken, response.value.user.email))
    })
  })
}

export function registerEmailUser(token, email) {
  return dispatch => dispatch({
    type: 'USER_EMAIL_CREATION',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/v1/auth/email/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        token,
        email,
      },
    })
  })
}

export function userRecover(email) {
  return dispatch => dispatch({
    type: 'USER_EMAIL_RESET',
    payload: firebase.auth().sendPasswordResetEmail(email),
  }).then((response) => {
    console.log("Reset response: ", response)
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