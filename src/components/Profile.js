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
    <div>
      <div>All User Posts</div>
      <div>
        {!loading ? (
          posts.posts.map((el, index) => {
            console.log("this is posts", posts.posts)
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
