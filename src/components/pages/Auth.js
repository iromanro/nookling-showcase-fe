import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { confirmAuth } from '../../actions/globalAction'
import history from '../../history'
import queryString from 'query-string'
import '../../styles/main.scss'
import FullScreenLoader from '../FullScreenLoader'

export const Auth = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.global.user)

  useEffect(() => {
    console.log("USER EFFECT: ", user)
    if (user.username) {
      console.log("We have this user: ", user.username)
      history.push('/')
    }
  }, [user])

  useEffect(() => {
    console.log("dispatching login"); 
    function authUser() {
      if (!user.username) {
        var query = queryString.parse(props.location.search)
        var code = query.code

        dispatch(confirmAuth(code))
      }
    }

    authUser()
  }, []);

  return(
    <div className="main">
      <FullScreenLoader />
    </div>
  )
}

export default Auth;