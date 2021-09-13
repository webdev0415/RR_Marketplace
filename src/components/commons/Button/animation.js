import React from "react"

import "./animation.scss"

const CustomButton = ({ children, onClick }) => (
  <div
    className="animation-button-wrap"
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex="0"
  >
    <button type="button" className="animation-button">
      {children}
    </button>
  </div>
)

export default CustomButton
