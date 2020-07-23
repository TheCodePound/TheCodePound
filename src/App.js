import React, { useEffect } from "react"
import "./styles/App.scss"
import Routes from "./routes.js"
import Nav from "./components/Nav.js"
import Footer from "./components/Footer.js"
import LeftNav from "./components/LeftNav"
import RightNav from "./components/RightNav"
import axios from "axios"
import { loginUser } from "./ducks/userReducer.js"
import { connect } from "react-redux"

function App(props) {
  useEffect(() => {
    axios
      .get("/auth/user")
      .then((res) => {
        props.loginUser(res.data)
      })
      .catch((err) => console.log(err))
  }, [props])

  return (
    <div className='App'>
      <div>
        <Nav />
      </div>
      <div className='center-div'>
        <div>
          <LeftNav />
        </div>
        <div className='routes'>
          <Routes />
        </div>
        <RightNav />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { loginUser })(App)
