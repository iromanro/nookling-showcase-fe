import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { confirmAuth } from '../../actions/globalAction'
import history from '../history'
import queryString from 'query-string'
import '../../styles/main.scss'
import MainNav from '../MainNav'

export const Auth = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.global.user);

  useEffect(() => {
    history.push('/')
  }, [user])

  useEffect(() => {
    function authUser() {
      var query = queryString.parse(props.location.search)
      var code = query.code

      dispatch(confirmAuth(code))
    }

    authUser()
  }, []);

  return(
    <div className="main">

    </div>
  )
}

export default Auth;