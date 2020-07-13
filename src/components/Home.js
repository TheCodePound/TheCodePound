import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts } from "../ducks/postReducer"

const Home = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true)

  // commenting out until post controller is built out so it dosent break anything.
  // useEffect(() => {
  //     axios
  //     .get('/api/posts')
  //     .then((res) => {
  //         getPosts(res.data)
  //     })
  //     .catch((err) => {
  //         console.log(err)
  //     })
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <div>
      <div>
        {props.userReducer.languages}
        <div>
          {props.userReducer.profile_pic}
          <inpit placeholder='Project details here...' />
          <div>
            <img />
            <img />
            <img />
            <button>Add Language +</button>
            <button>Post Pound</button>
          </div>
        </div>
      </div>
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
export default connect(mapStateToProps, { getPosts })(Home)
