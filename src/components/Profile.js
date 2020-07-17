import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts } from "../ducks/postReducer"

const Profile = ({ postReducer, posts, getPosts, ...props }) => {
  console.log("this is props", props)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/user/posts")
      .then((res) => {
        getPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="profile-container">
      <p className="profile-text">All User Posts</p>
      <div>
      {!loading ? (
          posts.posts.map((el, index) => {
            return (
              <div className="posts-home-container-main">
                <div
                  key={el?.id ?? index}
                  onClick={() => props.history.push(`/Popup/${el.post_id}`)}
                >
                  <div className="posts-info-container">
                    <div className="posts-user-info">
                      <img
                        className="posts-home-profile-image"
                        // src={el.profile_pic}
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fme.jpg?v=1569425179160"
                        alt="profile image"
                      />
                      <p className="posts-home-username">{el.full_name}</p>
                      <img
                        className="posts-home-language-image"
                        src={el.languages_img}
                        alt="language image"
                      />
                    </div>
                    <div className="post-details-box">
                      <div className="post-details">
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
                      <button className="comment-btn">Comment</button>  {/* {el.comment} */}
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>this will be loading.</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { getPosts })(Profile)
