import history from '../history'
import axios from 'axios'

export function confirmAuth(code) {
  console.log("Code: ", code);
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
    }).then((user) => {
      console.log("User: ", user);
    }).catch((err) => {
      history.push('/')
    })
  })
}
