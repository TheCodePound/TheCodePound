import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { registerUser } from "../ducks/userReducer.js"
import "../styles/App.scss"
import { connect } from "react-redux"

function Register(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function register() {
    if (password !== confirmPassword) {
      alert("passwords do not match")
    } else {
      axios
        .post("/auth/register", { fullname, email, password })
        .then((res) => {
          props.registerUser(res.data)
          props.history.push("/Home")
        })
        .catch((err) => {
          alert("Could not register.")
        })
    }
  }

  return (
    <div>
      <div className='signin-main'>
        <div className='signin-left'>
          <img
            className='landing-logo'
            src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fcodepound%20logo.png?v=1594656795551'
            alt='The Code Pound Dog'
          />
        </div>
        <div className='signin-right'>
          <img
            className='background-signin-bone'
            src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FBone.gif?v=1594661575701'
            alt='giant dog bone'
          />
          <div className='signin-content'>
            <h1 className='signin-bone-title'>
              Create a new
              <br /> Pound
            </h1>
            <p className='signin-bone-text'>It's quick and easy!</p>
            <div className='signin-inputs'>
              <input
                className='signin-bone-fields'
                placeholder='Full Name'
                type='text'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                className='signin-bone-fields'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='signin-bone-fields'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className='signin-bone-fields'
                placeholder=' Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className='signin-bone-btn' onClick={() => register()}>
                Register
              </button>
            </div>
            <Link style={{ textDecoration: "none" }} to='/'>
              <h4 className='signin-bone-forgot-acct'>Forgot Account?</h4>
            </Link>
          </div>
        </div>
      </div>
      <div id='about'>
        <h1 className='signin-about-title'>About</h1>
        <div className='about'>
          {/* <img src="" alt="ADDALT" /> */}
          <iframe
            title="What is Codepound"
            width='560'
            height='315'
            src='https://www.youtube.com/embed/e_MR32HrPxM'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
          <p className='signin-about-paragraph'>
            Welcome to the CodePound! A social media site geared toward developers and the ability
            for said developers to share the creative projects they have built throughout their
            careers. The CodePound is comparable to Instagram in sense of the post comment/ like of
            each project (the “like” can be a “bone” or something to set itself apart) However, not
            only does it allow developers to share projects, but receive feedback and or help on
            projects in order to better refine these projects for live hosting. Thus, when employers
            or others see these projects there is a more polished project backed by a community of
            developers who are helping one another grow... Also great for any developer hoping to
            get some extra teaching experience and learn some new things by helping other
            developers.
          </p>
        </div>
      </div>
      <hr id='line-break' />
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState

const mapDispatchToProps = { registerUser }

export default connect(mapStateToProps, mapDispatchToProps)(Register)
