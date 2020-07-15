import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts } from "../ducks/postReducer"

const Home = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true)
  // const [title, setTitle] = useState("")
  // const [img, setImg] = useState('')
  // const [content, setContrent] = useState('')

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

  // function handleTitle(e) {
  //   setTitle(e.target.value)
  // }

  // function handleImg(e) {
  //   setImg(e.target.value)
  // }

  // function handleContent(e) {
  //   setContent(e.target.value)
  // }

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   axios
  //     .post("/api/posts", { title, img, content, fullname: props.userReducer.user.fullname })
  //     .then((res) => {
  //       props.history.push("/Home")
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // dont know if we will want this button or not. Might add some good user experience.
  // function cancel() {
  //   props.history.push("/Home")
  // }

  return (
    <div>
      <div className='pound-container'>
        {props.user.languages}
        <div className='pound-text-details'>
          {props.user.profile_pic}
          <input placeholder='Project details here...' />
        </div>
        <div className='pound-gif-btn'>
          <div className='pound-icon-img'>
            <img />
            <img />
            <img />
          </div>
          <div className='pound-btns'>
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
