import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
//import { simpleAction } from './actions/simpleAction';
import './axios';
//import requireAuth from './utils/requireAuth';
import Home from './components/pages/Home'
import Event from './components/pages/Event'
import Auth from './components/pages/Auth'
import Settings from './components/pages/Settings'
import './App.scss'

// const mapStateToProps = state => ({
//   ...state,
//   isAuthenticated: state.isAuthenticated
// })

// const mapDispatchToProps = dispatch => ({
  //   //simpleAction: () => dispatch(simpleAction())
  // })

const App = ({ loading }) => loading !== true && (
  <Switch>
    {/* <Route path='/dashboard' component={requireAuth(Dashboard)}/> */}
    <Route exact path='/' component={Home}/>
    <Route exact path='/event' component={Event}/>
    <Route exact path='/auth' component={Auth}/>
    <Route exact path='/settings' component={Auth}/>
    <Redirect to="/" />
  </Switch>
);

export default App;