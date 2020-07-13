import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {loginUser} from '../ducks/userReducer.js'
import "../styles/App.scss"
import { connect } from 'react-redux'

function Signin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function login() {
        axios.post('/auth/login', {email, password})
        .then( res => {
            props.loginUser(res.data)
            props.history.push('/Home')
        })
        .catch(err => {alert('Username or password incorrect')})
    }

    return (
    <div>
        <div className="signin-main">
            <div className="signin-left">
                <img src="" alt="The Code Pound Dog"/>
            </div>
            <div className="signin-right">
                <h1>Welcome to the Pound</h1>
                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={() => login()}>Sign In</button>
                <h4>Don't Have an Account?</h4>
                <Link to="/Register">
                    <h4>Register Here</h4>
                </Link>
            </div>
        </div>
        <div id="about">
            <h1>About</h1>
            <div className="about">
                <img src="" alt="ADDALT"/>
                <p>Welcome to the CodePound! A social media site geared toward developers and the ability for said developers to share the creative projects they have built throughout their careers. The CodePound is comparable to Instagram in sense of the post comment/ like of each project (the “like” can be a “bone” or something to set itself apart) However, not only does it allow developers to share projects, but receive feedback and or help on projects in order to better refine these projects for live hosting. Thus, when employers or others see these projects there is a more polished project backed by a community of developers who are helping one another grow... Also great for any developer hoping to get some extra teaching experience and learn some new things by helping other developers.</p>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = reduxState => reduxState

const mapDispatchToProps = {loginUser}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)