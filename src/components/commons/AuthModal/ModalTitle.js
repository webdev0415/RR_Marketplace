import React from "react"
import CaretLeft from "../Icons/IconCaretLeft"

const modalTitle = ({ goBack }) => (
  <div
    className="backBtn"
    onClick={goBack}
    onKeyDown={goBack}
    role="button"
    tabIndex={0}
  >
    <CaretLeft />
  </div>
)

export default modalTitle
