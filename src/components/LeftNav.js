import React, {useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import {userBones} from '../ducks/bonesReducer'
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
    const pathname = props.location.pathname


    useEffect(() => {
      axios.get('/api/user/bones')
        .then(res => {
            userBones(res.data[0].count)
        })
      }, [props.userBones])

    function toggleUpdateInfo() {
        setUpdateInfo(!updateInfo)
    }

    function updateUser() {
        // console.log(email, password, full_name, new_email, new_password, profile_pic)
      axios.put(`/auth/update`, {email, password, full_name, new_email, new_password, profile_pic})  
      toggleUpdateInfo();
    }

    

    if (pathname === '/' || pathname === '/Register') {

    return (
        <div></div>
    )
    }

    if (pathname === '/Profile') {

    //PROFILE SECTION OF APPLICATION  
    return (
    
        <div className="left-nav-container">
            <div className="left-nav-div">
            {props.user.user.profile_pic != null ? (
          <div>
            <img
              className="pound-profile-pic"
              src={props.user.user.profile_pic}
              alt="profile"
            />
          </div>
          ) :           
          <div>
            <img
              className="pound-profile-pic-placeholder"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/403a546f-55d9-4bac-b978-518e26cae689/d1bmcrw-53d4ebd5-deb2-461b-8cf1-6765eddd972f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNDAzYTU0NmYtNTVkOS00YmFjLWI5NzgtNTE4ZTI2Y2FlNjg5XC9kMWJtY3J3LTUzZDRlYmQ1LWRlYjItNDYxYi04Y2YxLTY3NjVlZGRkOTcyZi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.APvnhZsX79G_qVrRnfSAUwKjd5D-DbBlXHN-n_r59AY"
              alt="profile"
            />
          </div>
           }
                <div className="dog-bones-container">
                    <img
                        className="dog-bones-image"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                        alt="bone"
                    />
                    <p className="dog-bones-number">{props.bones.bones}</p>
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
                {props.user.user.profile_pic != null ? (
                    <div className="left-nav-div">
                        <img
                        className="pound-profile-pic"
                        src={props.user.user.profile_pic}
                        alt="profile"
                        />
                    </div>
                    ) :           
                    <div>
                        <img
                        className="pound-profile-pic-placeholder"
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/403a546f-55d9-4bac-b978-518e26cae689/d1bmcrw-53d4ebd5-deb2-461b-8cf1-6765eddd972f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNDAzYTU0NmYtNTVkOS00YmFjLWI5NzgtNTE4ZTI2Y2FlNjg5XC9kMWJtY3J3LTUzZDRlYmQ1LWRlYjItNDYxYi04Y2YxLTY3NjVlZGRkOTcyZi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.APvnhZsX79G_qVrRnfSAUwKjd5D-DbBlXHN-n_r59AY"
                        alt="profile"
                        />
                    </div>
                    }
                    <div className="dog-bones-container">
                        <img
                            className="dog-bones-image"
                            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                            alt="bone"
                        />
                        <p className="dog-bones-number">{props.bones.bones}</p>
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

export default withRouter(connect(mapStateToProps, {logoutUser, getUser, userBones})(LeftNav))