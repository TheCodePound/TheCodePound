import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import axios from 'axios'
import '../styles/App.scss'

function LeftNav(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [image, setImage] = useState("")


    const pathname = props.location.pathname

    if (pathname === '/' || pathname === '/Register') {

    return (
        <div></div>
    )
    }

    else if (pathname === '/Profile') {

    return (
        <div>
            <img 
                src=""
                alt="user"
            />
            <h2>username</h2>
            <div>
                <img
                    src=""
                    alt="person"
                />
                <Link to="/Home">
                    <h2>Home</h2>
                </Link>     
            </div>
            <div>
                <img
                    src=""
                    alt="people"
                />
                <h2>Friends</h2>  
            </div>
            <div>
                <img
                    src=""
                    alt="bone"
                />
                <h2>Dog Bones</h2>
            </div>
            <div>
                <img
                    src=""
                    alt="plus"
                />
                <h2>Update Info</h2>
            </div>
            <Link to="/Newpost">
                <button>New Pound</button>
            </Link>
            <input
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder="Old Password"
                type="text"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
            />
            <input
                placeholder="New Password"
                type="text"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <input
                placeholder="Image URL"
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
            />
            <button>Update</button>
        </div>
    )
    }

    else if (pathname === '/Home') {
        return (
            <div>
                <img 
                    src=""
                    alt="user"
                />
                <h2>username</h2>
                <div>
                    <img
                        src=""
                        alt="person"
                    />
                    <Link to="/Profile">
                        <h2>Profile</h2>
                    </Link>
                </div>
                <div>
                    <img
                        src=""
                        alt="people"
                    />
                    <Link to="/Profile">
                        <h2>Friends</h2>
                    </Link>
                </div>
                <div>
                    <img
                        src=""
                        alt="bone"
                    />
                    <Link to="/Profile">
                        <h2>Dog Bones</h2>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(LeftNav))