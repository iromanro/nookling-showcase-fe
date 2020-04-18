import history from '../history';
import axios from 'axios';

export function confirmAuth(code) {
  return dispatch => dispatch({
    type: 'USER_LOGIN',
    payload: axios({
      method: 'POST',
      url: 'https://us-central1-nookling-showcase.cloudfunctions.net/auth/discord',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        code,
      },
    }).then((user) => {
      console.log("User: ", user);
    })
  })
}
