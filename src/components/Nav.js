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
    axios.delete('/api/logout')
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
        <div>
            <div>
                <img src="" alt="Dog Logo"/>
            </div>
            <div>
                <a href="#about">
                    <h2>About</h2>
                </a>
                <Link to="/Register">
                    <h2>Sign In</h2>
                </Link>
            </div>
        </div>
    )
}

else if (pathname === '/Register') {
    return (
        <div>
            <div>
                <img src="" alt="Dog Logo"/>
            </div>
            <div>
                <a href="#about">
                    <h2>About</h2>
                </a>
                <Link to="/">
                    <h2>Sign In</h2>
                </Link>
            </div>
        </div>
    )
}

else {
    return (
        <div>
            <div>
                <div>
                    <img src="" alt="Dog Logo"/>
                </div>
                <div>
                    <img 
                        src="" 
                        alt="Magnifying Glass"
                        onClick={() => siteSearch()}
                    />    
                    <input 
                        placeholder="Search Codepound"
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            </div>
        </div>
    )
}}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(Nav))