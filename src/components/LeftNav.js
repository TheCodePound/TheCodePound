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

    return (
    
        <div className="leftnavmain">
            <div className="left-nav-div">
                <img 
                    src=""
                    alt="user"
                />
                <div>
                    <img
                        src=""
                        alt="bone"
                     />
                </div>
            </div>
            <h2>username</h2>
            <div className="left-nav-div">
                <img
                    src=""
                    alt="person"
                />
                <Link to="/Home">
                    <h2>Home</h2>
                </Link>     
            </div>
            <div div className="left-nav-div">
                <img
                    src=""
                    alt="people"
                />
                <h2>Friends</h2>  
            </div>
            <div div className="left-nav-div">
                <img
                    src=""
                    alt="plus"
                    onClick={toggleUpdateInfo}
                />
                <h2>Update Info</h2>
            </div>
            <Link to="/Newpost">
                <button className={`new-pound ${!updateInfo ? "new-pound-open" : null}`}>New Pound</button>
            </Link>
            <div className={`updateMenu ${updateInfo ? "updateMenu-open" : null}`}>
                <input
                    placeholder="Current Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    placeholder="Current Password"
                    type="text"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <input
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    placeholder="New Email"
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
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
                /><br></br>
                <button 
                    onClick={() => updateUser()}>Update
                </button><br></br>
                <button
                    onClick={toggleUpdateInfo}>Cancel
                </button>
            </div>
        </div>
        
    )
    }

    else {
        return (
            <div className="left-nav-main">
                <div className="left-nav-div">
                    <img 
                        src=""
                        alt="user"
                    />
                    <div>
                        <img
                            src=""
                            alt="bone"
                        />
                    </div>
                </div>
                <h2>username</h2>
                <div className="left-nav-div">
                    <img
                        src=""
                        alt="person"
                    />
                    <Link to="/Profile">
                        <h2>Profile</h2>
                    </Link>
                </div>
                <div className="left-nav-div">
                    <img
                        src=""
                        alt="people"
                    />
                    <Link to="/Profile">
                        <h2>Friends</h2>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(LeftNav))