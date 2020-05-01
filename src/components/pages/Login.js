import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import history from "../../history"
import FullScreenLoader from "../FullScreenLoader"
import ToastMessage from "../ToastMessage"
import MainNav from "../MainNav"
import LoginForm from "../LoginForm"

const Login = () => {
  const isLoading = useSelector((state) => state.global.isLoading)
  const user = useSelector((state) => state.global.user)

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/")
    }
  }, [user])

  return (
    <div className="main">
      {isLoading ? <FullScreenLoader /> : ""}
      <MainNav />
      <LoginForm />
      <ToastMessage />
    </div>
  )
}

export default Login
