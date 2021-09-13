import React from "react"
import LoadingIcon from "assets/icons/loading.gif"
import "./styles.scss"

const Loading = () => (
  <div className="custom-loading">
    <img src={LoadingIcon} alt="loading" />
    <p>Loading...</p>
  </div>
)

export default Loading
