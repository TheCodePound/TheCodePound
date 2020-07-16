import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import axios from 'axios'
import '../styles/App.scss'
import { $CombinedState } from 'redux'

function LeftNav(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [image, setImage] = useState("")
    const [updateInfo, setUpdateInfo] = useState(true)
    const [newEmail, setNewEmail] = useState("")

    function toggleUpdateInfo() {
        setUpdateInfo(!updateInfo)
    }

    function updateUser() {
        const {id} = props.user.user
      axios.put(`/auth/update/${id}`, {email, oldPassword, name, newEmail, newPassword, image})  
    }


    const pathname = props.location.pathname

    if (pathname === '/' || pathname === '/Register') {

    return (
        <div></div>
    )
    }

    else if (pathname === '/Profile') {


    //PROFILE SECTION OF APPLICATION
    return (
    
        <div className="left-nav-container">
            <div className="left-nav-div">
                <img
                    className="profile-img-left-nav"  
                    src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FFamily%20Pic%202018%202.jpg?v=1546837304267"
                    alt="user"
                />
                <div className="dog-bones-container">
                    <img
                        className="dog-bones-image"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                        alt="bone"
                    />
                    <p className="dog-bones-number">127</p>
                </div>
            </div>
            <h2 className="left-nav-username">Benjamin Doggett</h2>
            <div className="left-nav-div">
                <img
                    src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fhome%20icon%20BIG.png?v=1594854280392"
                    alt="home icon"
                />
                <Link style={{ textDecoration: "none" }} to="/Home">
                    <h2 className="left-nav-text">Home</h2>
                </Link>     
            </div>
            <div div className="left-nav-div">
                <img
                    src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ffriends%20icon.png?v=1594842398388"
                    alt="friends"
                />
                <h2 className="left-nav-text">Friends</h2>  
            </div>
            <div div className="left-nav-div">
                <img
                    className="plus-symbol-image"
                    src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fplus%20BIG.png?v=1594854392581"
                    alt="plus"
                    onClick={toggleUpdateInfo}
                />
                <h2 className="left-nav-text">Update Info</h2>
            </div>
            <Link to="/Newpost">
                <button className={`new-pound ${!updateInfo ? "new-pound-open" : null }`}>New Pound</button>
            </Link>
            <div className={`${updateInfo ? "updateMenu-open" : "updateMenu"}`}>
                <input
                    className="update-input-field"
                    placeholder="Current Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="Current Password"
                    type="text"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="New Email"
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="New Password"
                    type="text"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="Image URL"
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                /><br></br>
                <button 
                    className="update-user-btn-update"
                    onClick={() => updateUser()}>Update
                </button><br></br>
                <button
                    className="update-user-btn-cancel"
                    onClick={toggleUpdateInfo}>Cancel
                </button>
            </div>
        </div>
        
    )
    }

    //HOME SECTION OF APPLICATION
    else {
        return (
            <div className="left-nav-container">
                <div className="left-nav-div">
                    <img
                        className="profile-img-left-nav" 
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FFamily%20Pic%202018%202.jpg?v=1546837304267"
                        alt="user"
                    />
                    <div className="dog-bones-container">
                    <img
                        className="dog-bones-image"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                        alt="bone"
                    />
                    <p className="dog-bones-number">127</p>
                </div>
                </div>
        <h2 className="left-nav-username">Benjamin Doggett</h2>
                <div className="left-nav-div">
                    <img
                        className="left-nav-user-icons"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fuser-profile-icon.png?v=1594841760468"
                        alt="person"
                    />
                    <Link style={{ textDecoration: "none" }} to="/Profile">
                        <h2 className="left-nav-text">Profile</h2>
                    </Link>
                </div>
                <div className="left-nav-div">
                    <img
                        className="left-nav-user-icons"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ffriends%20icon.png?v=1594842398388"
                        alt="people"
                    />
                    <Link style={{ textDecoration: "none" }} to="/Profile">
                        <h2 className="left-nav-text">Friends</h2>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(LeftNav))