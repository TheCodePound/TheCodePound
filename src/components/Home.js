import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getPosts } from "../ducks/postReducer"

const Home = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    axios
      .get("/api/all/posts")
      .then((res) => {
        getPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [])

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleImg(e) {
    setImg(e.target.value)
  }

  function handleContent(e) {
    setContent(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("hit")
    axios
      .post("/api/post", { title, content })
      .then((res) => {
        props.history.push("/Home")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function cancel() {
    props.history.push("/Home")
  }

  return (
    <div className='home-container'>
      <div className='pound-container'>
        {/* {props.user.languages} */}
        <img
          className='language-image'
          src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fjavascript-icon.png?v=1594835510447'
          alt='programming language icon'
        />
        <div className='pound-text-details'>
          {/* {props.user.profile_pic} */}
          <img
            className='pound-profile-pic'
            src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FFamily%20Pic%202018%202.jpg?v=1546837304267'
            alt='profile'
          />
          <input
            className='pound-text-input'
            placeholder='Project details here...'
            value={content}
            onChange={handleContent}
          />
        </div>
        <div className='pound-icons-btns'>
          <div className='pound-icons'>
            <img
              className='icon-image'
              src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficon%20image%20BIG.png?v=1594831414804'
              alt='image icon'
            />
            <img
              className='icon-image'
              src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fgif%20icon%20big.png?v=1594831425259'
              alt='gif icon'
            />
            <img
              className='icon-image'
              src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fvideo%20icon%20big.png?v=1594831421374'
              alt='video icon'
            />
          </div>
          <div className='pound-btns'>
            <button className='pound-individual-btn'>Add Language +</button>
            <button className='pound-individual-btn' onClick={handleSubmit}>
              Post Pound
            </button>
          </div>
        </div>
      </div>
      <div>
        {!loading ? (
          posts.posts.map((el, index) => {
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
