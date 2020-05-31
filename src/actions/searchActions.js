import axios from "axios"

export function getCreations(query) {
  return (dispatch) =>
    dispatch({
      type: "SEARCH_CREATIONS",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/search`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      data: query,
    })
}

export function other(query) {
  return (dispatch) =>
    dispatch({
      type: "GET_USER_PROFILE",
      payload: axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/api/v1/search`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    })
}
