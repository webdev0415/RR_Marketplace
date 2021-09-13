import React from "react"

const CloseIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" fill="none" />
    <path
      d="M14,1.41,12.59,0,7,5.59,1.41,0,0,1.41,5.59,7,0,12.59,1.41,14,7,8.41,12.59,14,14,12.59,8.41,7Z"
      transform="translate(5 5)"
    />
  </svg>
)

export default CloseIcon
