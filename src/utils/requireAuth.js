import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { logoutUser } from '../actions/userActions';

export default ComposedComponent => {
  class Authenticate extends React.Component {
    render () {
      return !this.props.isAuthenticated ? <Redirect to='/' /> : (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  function mapStateToProps(state){
    return {
      isAuthenticated: state.user.isAuthenticated,
      role: state.user.role,
    };
  }

  return connect(mapStateToProps, { logoutUser })(Authenticate);
};
