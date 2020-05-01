import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import "./axios"
import propTypes from "prop-types"
import requireAuth from "./utils/requireAuth"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Event from "./components/pages/Event"
import Profile from "./components/pages/Profile"
import CreatePost from "./components/pages/CreatePost"
import Design from "./components/pages/Design"
import ErrorPage from "./components/pages/ErrorPage"
import Auth from "./components/pages/Auth"
import Settings from "./components/pages/Settings"
import "./App.scss"

const App = ({ loading }) =>
  loading !== true && (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/event" component={Event} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create" component={CreatePost} />
      <Route exact path="/design/:uuid" component={Design} />
      <Route path="/profile/:uuid" component={Profile} />
      <Route exact path="/404" component={ErrorPage} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/settings" component={requireAuth(Settings)} />
      <Redirect to="/" />
    </Switch>
  )

App.propTypes = {
  loading: propTypes.bool.isRequired,
}

export default App
