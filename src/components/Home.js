import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getPosts } from "../ducks/postReducer";

const Home = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("/api/all/posts")
      .then((res) => {
        getPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      // .get(`/api/posts/bones/${post_id}`)
      // .then((res) => {
      //   getBones(res.data);
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
      .finally(() => setLoading(false));
  }, []);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleImg(e) {
    setImg(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hit");
    axios
      .post("/api/post", { title, content })
      .then((res) => {
        props.history.push("/Home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cancel() {
    props.history.push("/Home");
  }

  return (
    <div className="home-container">
      <div className="pound-container">
        {/* {props.user.languages} */}
        <img
          className="language-image"
          src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fjavascript-icon.png?v=1594835510447"
          alt="programming language icon"
        />
        <div className="pound-text-details">
          <img
            className="pound-profile-pic"
            src={props.user.user.profile_pic}
            alt="profile"
          />
          <div className="inputscontainer">
            <input
              className="pound-title-input"
              placeholder="post-title-here"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <textarea
              className="pound-text-input"
              placeholder="Project details here..."
              value={content}
              onChange={handleContent}
            />
          </div>
        </div>
        <div className="pound-icons-btns">
          <div className="pound-icons">
            <img
              className="icon-image"
              src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficon%20image%20BIG.png?v=1594831414804"
              alt="image icon"
            />
            <img
              className="icon-image"
              src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fgif%20icon%20big.png?v=1594831425259"
              alt="gif icon"
            />
            <img
              className="icon-image"
              src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fvideo%20icon%20big.png?v=1594831421374"
              alt="video icon"
            />
          </div>
          <div className="pound-btns">
            <button className="pound-individual-btn">Add Language +</button>
            <button className="pound-individual-btn" onClick={handleSubmit}>
              Post Pound
            </button>
          </div>
        </div>
      </div>
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
                      {/* Include here a date underneath the username in a div */}
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
                        <p className="dog-bones-number">{el.bones}</p> 

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
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getPosts })(Home);
