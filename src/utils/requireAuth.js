/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { userLogout } from "../actions/globalAction"

export default (ComposedComponent) => {
  class Authenticate extends React.Component {
    render() {
      return !this.props.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <ComposedComponent {...this.props} />
      )
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  function mapStateToProps(state) {
    console.log(state)
    return {
      isAuthenticated: state.global.user.isAuthenticated,
    }
  }

  return connect(mapStateToProps, { userLogout })(Authenticate)
}
