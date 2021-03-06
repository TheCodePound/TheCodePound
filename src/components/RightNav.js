import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
import "../styles/App.scss";

function RightNav(props) {
  // useEffect(() => {
  //   getLanguages();
  // }, []);

  // const [languages, setLanguages] = useState([]);

  // function getLanguages() {
  //   axios.get(`/api/languages/${id}`).then((res) => setLanguages(res.data));
  // }

  const { full_name } = props.user.user;
  const pathname = props.location.pathname;

  // const languageList = languages.map((e, index) => (
  //   <div key={index}>
  //     <img src={e.languages} />
  //   </div>
  // ));

  if (pathname === "/" || pathname === "/Register") {
    return <div></div>;
  } else if (pathname === "/Home") {
    return (
      <div className="right-home-nav-container">
        <div className="right-nav-div">
        <h1 className="home-right-nav-welcome-text"><span className="welcome-span">{`${full_name}!`}</span> Welcome to the HomePage</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="right-nav-languages">
        <p className="right-nav-favorite-programing-languages">
          Favorite Languages
        </p>
        <div className="red-box-arrow"></div>
        {/* {languageList} */}

        <div className="right-nav-images-container">
          <img
            className="right-nav-profile-language-icon"
            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fjavascript-icon.png?v=1594835510447"
            alt="programming language icon"
          />
          <img
            className="right-nav-profile-language-icon"
            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fnode-js-icon.png?v=1595265649911"
            alt="programming language icon"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(connect(mapStateToProps)(RightNav));
