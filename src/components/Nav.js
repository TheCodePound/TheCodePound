import React, {useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import axios from 'axios'
import '../styles/App.scss'

function Nav(props) {
    
    useEffect(() => {
        getUser()
    }, [])


const logout = () => {
    axios.delete('/auth/logout')
    .then(() => {
        props.logoutUser()
        props.history.push('/')
    })}

const [search, setSearch] = useState("")

function siteSearch() {
    console.log("search")
}

const pathname = props.location.pathname

if (pathname === '/') {
    return (
        <div className="signin-nav-container">
            <div>
                <img className="nav-main-logo" src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204" alt="Dog Logo"/>
            </div>
            <div className="signin-nav-right">
                <a href="#about">
                    <h2>About</h2>
                </a>
                <Link to="/Register">
                    <h2 className="signin-nav-link">Sign In</h2>
                </Link>
            </div>
        </div>
    )
}

else if (pathname === '/Register') {
    return (
        <div className="signin-nav-container">
            <div>
                <img className="nav-main-logo" src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204" alt="Dog Logo"/>
            </div>
            <div className="signin-nav-right">
                <a href="#about">
                    <h2>About</h2>
                </a>
                <Link to="/">
                    <h2 className="signin-nav-link">Sign In</h2>
                </Link>
            </div>
        </div>
    )
}

else {
    return (
        <div className="nav-container">
            <img className="nav-main-logo" src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204" alt="Dog Logo"/>
            <div className="nav-search">
                <img
                    className="nav-search-logo" 
                    src="" 
                    alt="Magnifying Glass"
                    onClick={() => siteSearch()}
                />    
                <input
                    className="nav-search-text" 
                    placeholder="Search Codepound"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <button className="nav-logout-btn" onClick={() => logout()}>Logout</button>
        </div>
    )
}}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(Nav))