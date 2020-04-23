import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { confirmAuth } from '../../actions/globalAction'
import history from '../../history'
import queryString from 'query-string'
import FullScreenLoader from '../FullScreenLoader'
import ToastMessage from '../ToastMessage'
import MainNav from '../MainNav'
import LoginForm from '../LoginForm'

export const Login = (props) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.global.isLoading)
  const user = useSelector(state => state.global.user)

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push('/')
    }
  }, [user])

  return(
    <div className="main">
      {isLoading ? <FullScreenLoader /> : ''}
      <MainNav />
      <LoginForm />
      <ToastMessage />
    </div>
  )
}

export default Login;