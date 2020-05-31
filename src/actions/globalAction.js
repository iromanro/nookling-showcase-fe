import axios from "axios"
import localStorage from "store"
import firebase from "firebase/app"
import history from "../history"
import setAuthorizationToken from "../utils/setAuthorizationToken"
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  projectId: "nookling-showcase",
  messagingSenderId: "102138940958",
  appId: "1:102138940958:web:d91990cfc6ba015c6be80f",
  measurementId: "G-MK2Q25LDMP",
}

export const myFirebase = firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope("https://www.googleapis.com/auth/userinfo.email")

export function confirmAuth(code) {
  return (dispatch) =>
    dispatch({
      type: "USER_LOGIN",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/auth/discord`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          code,
        },
      }),
    })
}

export function authGGoogleUser(token, email) {
  return (dispatch) =>
    dispatch({
      type: "AUTH_GOOGLE_USER",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          token,
          email,
        },
      }),
    })
}

export function googleAuth() {
  return (dispatch) =>
    dispatch({
      type: "GOOGLE_AUTH",
      payload: firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // let token = result.credential.accessToken
          // The signed-in user info.
          const { user } = result

          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
              dispatch(authGGoogleUser(idToken, user.email))
            })
        }),
    })
}

export function authEmailUser(token) {
  return (dispatch) =>
    dispatch({
      type: "AUTH_EMAIL_USER",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/auth/email/login`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          token,
        },
      }),
    })
}

export function userLogin(email, pass) {
  return (dispatch) =>
    dispatch({
      type: "USER_EMAIL_LOGIN",
      payload: firebase.auth().signInWithEmailAndPassword(email, pass),
    }).then(() => {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          dispatch(authEmailUser(idToken))
        })
    })
}

export function registerEmailUser(token, email) {
  return (dispatch) =>
    dispatch({
      type: "USER_EMAIL_CREATION",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/auth/email/register`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          token,
          email,
        },
      }),
    })
}

export function userRegister(email, pass) {
  return (dispatch) =>
    dispatch({
      type: "USER_EMAIL_REGISTRATION",
      payload: firebase.auth().createUserWithEmailAndPassword(email, pass),
    }).then((response) => {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          dispatch(registerEmailUser(idToken, response.value.user.email))
        })
    })
}

export function userRecover(email) {
  return (dispatch) =>
    dispatch({
      type: "USER_EMAIL_RESET",
      payload: firebase.auth().sendPasswordResetEmail(email),
    })
}

export function setCurrentUser(user) {
  return (dispatch) =>
    dispatch({
      type: "SET_CURRENT_USER",
      user,
    })
}

export function userLogout() {
  return (dispatch) => {
    localStorage.remove("jwt")
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function getUserSettings() {
  return (dispatch) =>
    dispatch({
      type: "GET_USER_SETTINGS",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/settings`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}

export function updateUserSettings(settings) {
  return (dispatch) =>
    dispatch({
      type: "UPDATE_USER_SETTINGS",
      payload: axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/api/v1/settings`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          settings,
        },
      }),
    })
}

export function getUserProfile(uuid) {
  let url = ""
  if (uuid === "") {
    url = `${process.env.REACT_APP_API_URL}/api/v1/profile`
  } else {
    url = `${process.env.REACT_APP_API_URL}/api/v1/profile/${uuid}`
  }

  return (dispatch) =>
    dispatch({
      type: "GET_USER_PROFILE",
      payload: axios({
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}

export function submitPost(
  post,
  images,
  name,
  type,
  tags,
  desc,
  contributions
) {
  return (dispatch) =>
    dispatch({
      type: "CREATE_POST",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          postId: post,
          images,
          name,
          type,
          tags,
          description: desc,
          allowContributions: contributions,
        },
      }),
    }).then((newPost) => {
      history.push(`/design/${newPost.action.payload.data.postId}`)
    })
}

export function updatePost(post, images, name, tags, desc, contributions) {
  return (dispatch) =>
    dispatch({
      type: "UPDATE_POST",
      payload: axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${post}/edit`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          images,
          name,
          tags,
          description: desc,
          allowContributions: contributions,
        },
      }),
    }).then((newPost) => {
      history.push(`/design/${newPost.action.payload.data.postId}`)
    })
}

export function loadExistingPost(uuid) {
  return (dispatch) =>
    dispatch({
      type: "LOAD_EXISTING_POST",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${uuid}/edit`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}

export function deletePost(uuid) {
  return (dispatch) =>
    dispatch({
      type: "DELETE_POST",
      payload: axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${uuid}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }).then(() => {
      history.push("/")
    })
}

export function getDesign(uuid) {
  return (dispatch) =>
    dispatch({
      type: "GET_DESIGN",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${uuid}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }).then((response) => {
      console.log("Res: ", response)
    })
}

export function likeDesign(uuid) {
  return (dispatch) =>
    dispatch({
      type: "LIKE_DESIGN",
      payload: axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${uuid}/like`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}

export function itemSearch(term) {
  return (dispatch) =>
    dispatch({
      type: "SEARCH_ITEM",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/search/item/${term}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}

export function clearItemSearch() {
  return (dispatch) =>
    dispatch({
      type: "CLEAR_RESULTS",
    })
}

export function addItemToDesign(designId, itemId) {
  return (dispatch) =>
    dispatch({
      type: "ADD_ITEM_TO_DESIGN",
      payload: axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${designId}/item`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          itemId,
        },
      }),
    }).then(() => {
      dispatch(clearItemSearch())
    })
}

export function removeItemFromDesign(designId, itemId) {
  return (dispatch) =>
    dispatch({
      type: "REMOVE_ITEM_FROM_DESIGN",
      payload: axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/api/v1/design/${designId}/item/remove`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          itemId,
        },
      }),
    })
}

export function clearToast() {
  return (dispatch) =>
    dispatch({
      type: "CLEAR_TOAST",
    })
}
