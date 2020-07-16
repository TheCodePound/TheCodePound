import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts } from "../ducks/postReducer"

const Profile = ({ postReducer, posts, setPosts, ...props }) => {
  const [loading, setLoading] = useState(true)

  //need api to get all of the users specific posts

  // useEffect(() => {
  //     axios
  //       .get("/api/")
  //       .then((res) => {
  //         setPosts(res.data)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //       .finally(() => setLoading(false))
  //   }, [])

  return (
    <div className="profile-container">
      <p className="profile-text">All User Posts</p>
      <div>
        {!loading ? (
          postReducer.posts.map((el, index) => {
            return (
              <div key={el?.id ?? index} onClick={() => props.history.push(`/Popup/${el.post_id}`)}>
                <div>
                  <div>
                    <h3>
                      {el.profile_pic}
                      {el.full_name}
                      {el.languages}
                    </h3>
                  </div>
                  <div>
                    <p>{el.content}</p>
                    <img src={el.img} alt='post img' />
                  </div>
                  <div>
                    <p>
                      {el.bones}
                      {el.comment}
                    </p>
                  </div>
                  <hr />
                </div>
              </div>
            )
          })
        ) : (
          <div>this will be loading.</div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { getPosts })(Profile)
