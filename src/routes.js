import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Newpost from './components/Newpost.js'
import Popup from './components/Popup.js'
import Profile from './components/Profile'
import Signin from './components/Signin.js'

export default (
    <Switch>
        <Route exact path="/" component={Signin}/>
        <Route path="/Home" component={Home}/>
        <Route path="/Newpost" component={Newpost}/>
        <Route path="/Popup/:post_id" component={Popup}/>
        <Route path="/Profile" component={Profile}/>
    </Switch>
)