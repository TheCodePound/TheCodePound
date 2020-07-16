import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"
import "../styles/App.scss"

function RightNav(props) {
  useEffect(() => {
    getLanguages()
  }, [])

  const [languages, setLanguages] = useState([])

  function getLanguages() {
    axios.get(`/api/languages/${id}`).then((res) => setLanguages(res.data))
  }

  const { full_name, id } = props.user.user
  const pathname = props.location.pathname

  const languageList = languages.map((e, index) => (
    <div key={index}>
      <img src={e.languages} />
    </div>
  ))

  if (pathname === "/" || pathname === "/Register") {
    return <div></div>
  } else if (pathname === "/Home") {
    return (
      <div className='right-home-nav-container'>
        <h1 className='home-right-nav-welcome-text'>{`Welcome Home ${full_name}!`}</h1>
      </div>
    )
  } else {
    return (
      <div>
        <div>Tail Wagging Favorites</div>
        {languageList}
      </div>
    )
    }

    else {
        return (
            <div className="right-nav-languages">
                <p className="right-nav-favorite-programing-languages">Tail Wagging Favorites</p>
            {languageList}

            </div>
        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default withRouter(connect(mapStateToProps)(RightNav))
