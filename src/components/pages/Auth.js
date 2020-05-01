import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import queryString from "query-string"
import propTypes from "prop-types"
import { confirmAuth } from "../../actions/globalAction"
import history from "../../history"
import "../../styles/main.scss"
import FullScreenLoader from "../FullScreenLoader"

const Auth = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.global.user)

  useEffect(() => {
    if (user.username) {
      history.push("/")
    }
  }, [user])

  useEffect(() => {
    function authUser() {
      if (!user.username) {
        const query = queryString.parse(props.location.search)
        const { code } = query

        dispatch(confirmAuth(code))
      }
    }

    authUser()
  }, [])

  return (
    <div className="main">
      <FullScreenLoader />
    </div>
  )
}

Auth.propTypes = {
  location: propTypes.string.isRequired,
}

export default Auth
