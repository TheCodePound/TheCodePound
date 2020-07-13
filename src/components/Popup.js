import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"

const Popup = (props) => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [content, setContent] = useState("")
  const [editMode, setEditMode] = useState(false)

  //commented out so we dont have errors while back end is being built out

  //   useEffect(() => {
  //     function selectedPost() {
  //       axios
  //         .get(`/api/post/${props.match.params.id}`)
  //         .then((res) => {
  //           setPost(res.data)
  //           setImg(res.data.img)
  //           setTitle(res.data.title)
  //           setContent(res.data.content)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })
  //         .finally(() => {
  //           setLoading(false)
  //         })
  //     }
  //     selectedPost()
  //   }, [props.match.params.id])

  //   function deletePost() {
  //     axios
  //       .delete(`/api/post/${props.match.params.id}`)
  //       .then((res) => {
  //         props.history.push("/Home")
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  //   function submitHandler() {
  //     axios
  //       .put(`/api/post/${props.match.params.id}`, {
  //         title,
  //         img,
  //         content,
  //         author_id: props.userReducer.user.userId,
  //       })
  //       .then((res) => {
  //         props.history.push("/Home")
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }

  function editPost() {
    setEditMode(true)
  }

  function backBtn() {
    props.history.push("/Home")
  }

  function cancel() {
    props.history.push("/Home")
  }

  function titleHandler(e) {
    setTitle(e.target.value)
  }

  function imgHandler(e) {
    setImg(e.target.value)
  }

  function contentHandler(e) {
    setContent(e.target.value)
  }

  if (loading) return <p>loading circle here</p>

  return (
    <div>
      {editMode ? (
        <div>
          <div>
            <input
              value={title}
              onChange={titleHandler}
              placeholder='Title'
              id='outlined-basic'
              label='Title'
              variant='outlined'
              multiline
              rows={2}
            />
          </div>
          <div>
            <input
              value={img}
              onChange={imgHandler}
              placeholder='Image'
              id='outlined-basic'
              label='Img'
              variant='outlined'
              multiline
              rows={2}
            />
          </div>
          <div>
            <input
              value={content}
              onChange={contentHandler}
              placeholder='Content'
              id='outlined-basic'
              label='Content'
              variant='outlined'
              multiline
              rows={4}
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3>
              {post.profile_pic}
              {post.full_name}
              {post.languages}
            </h3>
          </div>
          <div>
            <p>{post.content}</p>
            <img src={post.img} alt='post img' />
          </div>
          <div>
            <p>
              {post.bones}
              {post.comment}
            </p>
          </div>
        </div>
      )}
      {editMode ? (
        <div>
          {/* <button onClick={submitHandler}>Submit</button>
          <button onClick={cancel}>Cancel</button> */}
        </div>
      ) : (
        <div>
          <button onClick={backBtn}>Back</button>
          <button onClick={editPost}>Edit</button>
          {/* <button onClick={deletePost}>Delete</button> */}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(Popup)
