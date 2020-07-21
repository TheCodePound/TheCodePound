import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Popup = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([{}]);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [languages, setLanguage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [makeComment, setMakeComment] = useState(false)
  const [comments, setComment] = useState("")

  function toggleMakeComment() {
    setMakeComment(!makeComment)
  }

  function addComment(id) {
    axios.post(`api/post/comment/${props.match.params.post_id}`, {comments}).then(() => {
      setComment("")
      toggleMakeComment()
    })
  }

  useEffect(() => {
    function selectedPost() {
      axios
        .get(`/api/one/post/${props.match.params.post_id}`)
        .then((res) => {
          setPost(res.data[0]);
          setTitle(res.data[0][0].title);
          setImg(res.data[0][0].img);
          setContent(res.data[0][0].content);
          setLanguage(res.data[0][0].languages);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    selectedPost();
  }, [props.match.params.post_id]);

  // function deletePost() {
  //   axios
  //     .delete(`/api/post/${props.match.params.id}`)
  //     .then((res) => {
  //       props.history.push("/Home")
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  function submitHandler() {
    axios
      .put(`/api/post/${props.match.params.post_id}`, {
        title,
        img,
        content,
        languages,
      })
      .then((res) => {
        props.history.push("/Home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost() {
    setEditMode(true);
  }

  function backBtn() {
    props.history.push("/Home");
  }

  function cancel() {
    props.history.push("/Home");
  }

  function titleHandler(e) {
    setTitle(e.target.value);
  }

  function imgHandler(e) {
    setImg(e.target.value);
  }

  function contentHandler(e) {
    setContent(e.target.value);
  }

  if (loading) return <p>loading circle here</p>;

  return (
    <div>
      {editMode ? (
        <div>
          <div>
            <input
              // value={title}
              onChange={titleHandler}
              placeholder="Project Title"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <input
              // value={img}
              onChange={imgHandler}
              placeholder="New image url..."
              id="outlined-basic"
              label="Img"
              variant="outlined"
              multiline
              rows={2}
            />
          </div>
          <div>
            <input
              // value={content}
              onChange={contentHandler}
              placeholder="Project details here..."
              id="outlined-basic"
              label="Content"
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
          <button>Cancel</button>
          <button>Update</button>
        </div>
      ) : (
        <div className="edit-post-main-container">
          <div className="edit-posts-info-container">
            <div className="edit-post-header-display">
              <div className="edit-posts-user-info">
                <img
                  className="edit-posts-home-profile-image"
                  // src={el.profile_pic}
                  src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fme.jpg?v=1569425179160"
                  alt="profile image"
                />
                <div className="edit-post-name-time">
                  <p className="edit-posts-home-username">Benjamin Doggett</p>
                  <p className="post-time"><span>57</span>min</p>
                </div>
                <img
                  className="edit-posts-home-language-image"
                  src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fnode-js-icon.png?v=1595265649911"
                  alt="language image"
                />
              </div>
              <button className="popUp-cancel-btn">Delete Post</button>
            </div>
            <div className="edit-post-details-box">
              <div className="edit-post-details">
                {/* This is where the title goes */}
                <h2>CodePound</h2>
                {/* This is the project details */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  sed tellus eros. Duis mauris erat, sollicitudin at gravida at,
                  finibus id nibh. Praesent et nibh non dolor ultricies
                  consectetur. Pellentesque cursus risus nec felis congue, quis
                  luctus metus faucibus. Proin eget posuere urna. Nam sodales id
                  massa et semper.
                </p>
                <img
                  className="edit-post-image"
                  src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FLanding%20FINAL%20component.png?v=1595264619244"
                  alt="post img"
                />
              </div>
            </div>
            <div className="edit-post-user-interaction-container">
              <div className="edit-post-user-bones">
                <img
                  className="edit-dog-bones-image"
                  src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fbone%20like%20button.png?v=1594853507429"
                  alt="bone"
                />
                <p className="edit-dog-bones-number">{props.bones}</p>
              </div>
              <button 
              className="edit-comment-btn"
              onClick={() => toggleMakeComment()}>Comment</button>{" "}
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
                          onClick={() => addComment()}
                          >Post Comment</button>
                        </div>
                      </div>
            <hr />
          </div>
        </div>
      )}
      {editMode ? (
        <div>
          {/* <button onClick={submitHandler}>Submit</button>
          <button onClick={cancel}>Cancel</button> */}
        </div>
      ) : (
        <div className="popUp-btns">
          <button className="popUp-back-btn" onClick={backBtn}>
            Back
          </button>
          <button className="popUp-edit-btn" onClick={editPost}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Popup);
