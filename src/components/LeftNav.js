import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import axios from 'axios'
import '../styles/App.scss'

function LeftNav(props) {

    const [full_name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setOldPassword] = useState("")
    const [new_password, setNewPassword] = useState("")
    const [profile_pic, setImage] = useState("")
    const [updateInfo, setUpdateInfo] = useState(true)
    const [new_email, setNewEmail] = useState("")

    function toggleUpdateInfo() {
        setUpdateInfo(!updateInfo)
    }

    function updateUser() {
      axios.put(`/auth/update`, {email, password, full_name, new_email, new_password, profile_pic})  
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
                    src={props.user.user.profile_pic}
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
            <h2 className="left-nav-username">{props.user.user.full_name}</h2>
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
            <Link to="/Home">
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
                    type="password"
                    value={password}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="Full Name"
                    type="text"
                    value={full_name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="New Email"
                    type="email"
                    value={new_email}
                    onChange={e => setNewEmail(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="New Password"
                    type="password"
                    value={new_password}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input
                    className="update-input-field"
                    placeholder="Image URL"
                    type="text"
                    value={profile_pic}
                    onChange={e => setImage(e.target.value)}
                />
                <br></br>
                <button 
                    className="update-user-btn-update"
                    onClick={() => updateUser()}>Update
                </button>
                <br></br>
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
                        src={props.user.user.profile_pic}
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
                <h2 className="left-nav-username">{props.user.user.full_name}</h2>
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