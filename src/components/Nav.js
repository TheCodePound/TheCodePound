import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser, loginUser } from "../ducks/userReducer";
import axios from "axios";
import "../styles/App.scss";

function Nav(props) {
  useEffect(() => {
    getUser();
  }, []);

  function login() {
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push("/Home");
      })
      .catch((err) => {
        alert("Username or password incorrect");
      });
  }

  const logout = () => {
    axios.delete("/auth/logout").then(() => {
      props.logoutUser();
      props.history.push("/");
    });
  };

  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function siteSearch() {
    console.log("search");
  }

  const pathname = props.location.pathname;

  if (pathname === "/") {
    return (
      <div className="signin-nav-container">
        <div>
          <img
            className="nav-main-logo"
            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204"
            alt="Dog Logo"
          />
        </div>
        <div className="signin-nav-inputs-container">
          <input
            className="signin-nav-inputs"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signin-nav-inputs"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signin-nav-btn" onClick={() => login()}>Sign In</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-container">
        <img
          className="nav-main-logo"
          src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ficons8-dog-64.png?v=1594436168204"
          alt="Dog Logo"
        />
        <div className="nav-search">
          <img
            className="nav-search-logo"
            src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Fmagnifying-glass-thin.png?v=1594746257323"
            alt="Magnifying Glass"
            onClick={() => siteSearch()}
          />
          <input
            className="nav-search-text"
            placeholder="Search Codepound"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="nav-logout-btn" onClick={() => logout()}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { logoutUser, getUser, loginUser })(Nav)
);
