import axios from "axios"
import localStorage from "store"
import store from "./store"
import history from "./history"
import { userLogout } from "./actions/globalAction"

axios.interceptors.request.use((config) => {
  const jwt = localStorage.get("jwt")
  const newConfig = config

  if (jwt) {
    const bearer = `Bearer ${jwt}`
    newConfig.headers.common.Authorization = bearer

    return newConfig
  }

  delete newConfig.headers.common.Authorization

  return newConfig
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch(userLogout())
      history.push("/")
    } else if (error.response && error.response.status === 404) {
      history.push("/404")
    }

    return Promise.reject(error)
  }
)
