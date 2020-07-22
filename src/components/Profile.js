import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts, getBones, getComments } from "../ducks/postReducer"

const Profile = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [makeComment, setMakeComment] = useState(false)
  const [comments, setComment] = useState("")

  useEffect(() => {
    axios
      .get("/api/user/posts")
      .then((res) => {
        getPosts(res.data[0])
        getBones(res.data[1])
        getComments(res.data[2])
      })
      .catch((err) => {
        console.log(err)
      })

      .finally(() => setLoading(false))
  }, [])

  function toggleMakeComment() {
    setMakeComment(!makeComment)
  }

  function addComment(id) {
    axios.post(`api/post/comment/${id}`, {comments}).then(() => {
      setComment("")
      toggleMakeComment()
    })
  }

  return (
    <div className="profile-container">
      <p className="profile-text">All User Posts</p>
      <div>
      {!loading ? (
          posts.posts.map((el, index) => {
            if (props.filter.filter) {
              if (el.languages.toLowerCase().includes(props.filter.filter.toLowerCase())) {
                return (
                  <div className="posts-home-container-main">
                  <div>
                    <div className="posts-info-container">
                      <div className="posts-user-info">
                        <img
                          className="posts-home-profile-image"
                          src={el.profile_pic}
                          alt="profile image"
                        />
                        <div className="post-name-time">
                          <p className="posts-home-username">{el.full_name}</p>
                          <p className="post-time"><span>57</span>min</p>
                        </div>
                        <img
                          className="posts-home-language-image"
                          src={el.languages_img}
                          alt="language image"
                        />
                      </div>
                      <div 
                        className="post-details-box"
                        onClick={() => props.history.push(`/Popup/${el.post_id}`)}>
                        <div className="post-details">
                          <h1 className="post-details-title">{el.title}</h1>
                          <p>{el.content}</p>
                          <img 
                            className="post-image"
                            src={el.img} alt="post img" 
                          />
                        </div>
                      </div>
                      <div className="post-user-interaction-container">
                        <div className="post-user-bones">
                          <img
                            className="dog-bones-image"
                            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                            alt="bone"
                          />
                          <p className="dog-bones-number">12</p> {/* {el.bones} */} 
                        </div>
                        <button 
                          className="comment-btn"
                          onClick={() => toggleMakeComment()}>Comment</button>
                      </div>
                      <div className={`${makeComment ? "make-comment" : "make-comment-open"}`}>
                          <div className="user-information-comment">
                          <img 
                            src={props.user.user.profile_pic}
                            className="make-comment-image"
                            />
                          <h2>{props.user.user.full_name}</h2>
                          </div>
                          <div>
                          <input
                            className="comment-text-input"
                            placeholder="Type Comment Here"
                            value={comments}
                            onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                          <div className="post-button-div">
                          <button
                            className="post-comment-button"
                            onClick={() => addComment(el.post_id)}
                            >Post Comment</button>
                          </div>
                        </div>
                      <hr />
                    </div>
                  </div>
                </div>
                )
              }
              else {
                return null
              }
            }
            return (
              <div className="posts-home-container-main">
                <div>
                  <div className="posts-info-container">
                    <div className="posts-user-info">
                      <img
                        className="posts-home-profile-image"
                        src={el.profile_pic}
                        alt="profile image"
                      />
                      <div className="post-name-time">
                        <p className="posts-home-username">{el.full_name}</p>
                        <p className="post-time"><span>57</span>min</p>
                      </div>
                      <img
                        className="posts-home-language-image"
                        src={el.languages_img}
                        alt="language image"
                      />
                    </div>
                    <div 
                      className="post-details-box"
                      onClick={() => props.history.push(`/Popup/${el.post_id}`)}>
                      <div className="post-details">
                        <h1 className="post-details-title">{el.title}</h1>
                        <p>{el.content}</p>
                        <img 
                          className="post-image"
                          src={el.img} alt="post img" 
                        />
                      </div>
                    </div>
                    <div className="post-user-interaction-container">
                      <div className="post-user-bones">
                        <img
                          className="dog-bones-image"
                          src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                          alt="bone"
                        />
                        <p className="dog-bones-number">12</p> {/* {el.bones} */} 
                      </div>
                      <button 
                        className="comment-btn"
                        onClick={() => toggleMakeComment()}>Comment</button>
                    </div>
                    <div className={`${makeComment ? "make-comment" : "make-comment-open"}`}>
                        <div className="user-information-comment">
                        <img 
                          src={props.user.user.profile_pic}
                          className="make-comment-image"
                          />
                        <h2>{props.user.user.full_name}</h2>
                        </div>
                        <div>
                        <input
                          className="comment-text-input"
                          placeholder="Type Comment Here"
                          value={comments}
                          onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="post-button-div">
                        <button
                          className="post-comment-button"
                          onClick={() => addComment(el.post_id)}
                          >Post Comment</button>
                        </div>
                      </div>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { getPosts, getBones, getComments })(Profile)
