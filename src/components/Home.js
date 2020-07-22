import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getPosts, getBones, getComments } from "../ducks/postReducer";


const Home = ({ postReducer, posts, getPosts, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [content, setContent] = useState("")
  const [addPic, setAddPic] = useState(true)
  const [allLanguages, setLanguages] = useState([])
  const [addLanguage, setAddLanguage] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [language, setLanguage] = useState("")
  const [languages_img, setLanguageIcon] = useState("")
  const [comments, setComment] = useState("")
  const [bones, setBones] = useState([])
  const [makeComment, setMakeComment] = useState(false)
  const [getPostComments, setPostComments] = useState([])
  const [seeAllComments, setSeeAllComments] = useState(false)

  function toggleMakeComment() {
    setMakeComment(!makeComment)
  }

  function toggleAddPic() {
    setAddPic(!addPic)
  }

  function toggleAddLanguage() {
    setAddLanguage(!addLanguage)
  }

  function toggleOpenDropdown() {
    setOpenDropdown(!openDropdown)
  }

  function toggleAllComments(){
    setSeeAllComments(!seeAllComments)
  }

  useEffect(() => {
    axios
      .get("/api/all/posts")
      .then((res) => {

        getPosts(res.data[0])
        setBones(res.data[1])
        setPostComments(res.data[2])
        console.log('getcomments',res.data[2][0])
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false))
      getLanguages()
  }, [])

  function getLanguages() {
    axios.get('api/all/languages')
    .then(res => {
      setLanguages(res.data)
    })
  } 

  function handleImg(e) {
    setImg(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    const languages = language
    e.preventDefault();
    axios
      .post("/api/post/in/one", { title, content, img, languages, languages_img })
      .then((res) => {
        props.history.push("/Home");
      })
      .catch((err) => {
        console.log(err)
      })
      setTitle("")
      setContent("")
      setImg("")
      setLanguage("")
      setLanguageIcon("")
      toggleAddPic()
  }

  function selectLanguage(language, icon) {
      setLanguage(language)
      setLanguageIcon(icon)
      toggleAddLanguage()
      toggleOpenDropdown()
  }

  function addComment(id) {
    axios.post(`api/post/comment/${id}`, {comments}).then(() => {
      setComment("")
      toggleMakeComment()
    })
  }



    const languageList = allLanguages.map((e, index) => {
      return (
        <div 
          key={index}
          className="scrollbar-div"
          onClick={() => selectLanguage(e.languages, e.languages_img)}>
          <img 
            src={e.languages_img} 
            alt={e.languages}
            className="dropdown-icon"
          />
          <h3 className="dropdown-name">{e.languages}</h3>
        </div>
      )
    }
  )

  return (
    <div className="home-container">
      <div className="pound-container">
        <img
          className='language-image'
          src={languages_img}
          alt=''
        />
        <div className="pound-text-details">
          <img
            className="pound-profile-pic"
            src={props.user.user.profile_pic}
            alt="profile"
          />
          <div className="inputscontainer">
            <input
              className='pound-title-input'
              placeholder='Post title here...'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <textarea
              className='pound-text-input'
              placeholder='Project details here...'
              value={content}
              onChange={handleContent}
            />
          </div>
        </div>
        <div className={`${addPic ? "add-post-pic-open" : "add-image-div"}`}>
          <div>
            <input
              className='new-post-image-url'
              placeholder='Image URL here...'
              value={img}
              onChange={handleImg}
            />
          </div>
          <img 
            src={img} 
            alt=""
            className='image-preview'
          />
        </div>
        <div className='pound-icons-btns'>
          <div className='pound-icons'>
            <img
              className='icon-image'
              src='https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficon%20image%20BIG.png?v=1594831414804'
              alt='image icon'
              onClick={() => toggleAddPic()}
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
          <div className='pound-btns'>
            <div className="relativity">
              <button className='pound-individual-btn' onClick={() => toggleAddLanguage()}>Add Language +</button>
              <div className={`${addLanguage ? "scroll-div" : "scroll-div-open"}`}>
                <div className="scrolldown-label-div"
                  onClick={() => toggleOpenDropdown()}>
                  <h3 className="scrolldown-label">Language</h3>
                  <img className={`${openDropdown ? "arrow-image" : "arrow-image-open"}`} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6InPWiE5FO1K0z_mlLYlMet4gVSoCGE0Exw&usqp=CAU"/>
                </div>
                <div className={`${openDropdown ? "dropdown-options" : "dropdown-options-open"}`}>
                  {languageList}
                </div>
              </div>
            </div>
            <button className='pound-individual-btn' onClick={handleSubmit}>Post Pound
            </button>
          </div>
        </div>
      </div>

      <div>
        {!loading ? (posts.posts.map((el, index) => {
          // console.log('jason check' ,getPostComments[index][1])
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
                        src={el.img} 
                        alt="post img"   
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
                      <p className="dog-bones-number">{bones[index][0].count}</p> 
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
                        onClick={() => addComment(el.post_id)}>Post Comment
                      </button>
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
            <div key={el.post_id} className="posts-home-container-main">
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
                        src={el.img} 
                        alt="post img"   
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
                      <p className="dog-bones-number">{bones[index][0].count}</p> 
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
                      <h2 className="make-comment-username">{props.user.user.full_name}</h2>
                    </div>
                    <div>
                      <textarea
                        className="comment-text-input"
                        placeholder="Type Comment Here"
                        value={comments}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="post-button-div">
                      <button
                        className="post-comment-button"
                        onClick={() => addComment(el.post_id)}>Post Comment
                      </button>
                    </div>
                  {/* COMMENT DISPLAY ON A POST */}
                    {getPostComments[index][0] != null?(
                    <div className="comment-container">
                      <div className="comments-profile-info">
                        <img src={getPostComments[index][0].profile_pic}
                            className="comments-profile-image"
                            alt="user" />
                      </div>
                      <div>
                        <h3 className="comments-username">{getPostComments[index][0].full_name}</h3>
                        <div className="comments-border-container">
                          <p className="comments-border">{getPostComments[index][0].comments}</p>
                          {/* <p className="comments-border">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> */}
                        </div> 
                      </div>
                      <p className="comments-date">{getPostComments[index][0].comments_date}</p>
                      <div className="all-comments-container">
                        <div></div>
                        {getPostComments[index][1] != null ? (
                          <div>
                          <button onClick={() => toggleAllComments()}>See all Comments</button>
                          {seeAllComments === true ? (
                          <div>

                            <div className="comments-profile-info">
                              <img src={getPostComments[index][1].profile_pic}
                              className="comments-profile-image"
                              alt="user" />
                            </div>
                            <div>
                              <h3 className="comments-username">{getPostComments[index][1].full_name}</h3>
                              <div className="comments-border-container">
                                <p className="comments-border">{getPostComments[index][1].comments}</p>
                              </div> 
                            </div>
                            <p className="comments-date">{getPostComments[index][1].comments_date}</p>
                          </div> 
                          ) : null}
                          </div>
                          ) : null }
                      </div>
                    </div>
                     ) : null}
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            );
          })
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getPosts, getBones, getComments })(Home);
