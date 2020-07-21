import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./components/Home"
import Popup from "./components/Popup.js"
import Profile from "./components/Profile"
import Signin from "./components/Signin.js"
import { useStore } from "react-redux"

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Signin} />
      <ProtectedRoute path='/Home' component={Home} />
      <ProtectedRoute path='/Popup/:post_id' component={Popup} />
      <ProtectedRoute path='/Profile' component={Profile} />
    </Switch>
  )
}

const ProtectedRoute = (props) => {
  const {
    user: { user },
  } = useStore().getState()

  if (user.email === "") {
    return <Redirect to='/' />
  } else {
    return <Route {...props} />
  }
}

export default Routes
