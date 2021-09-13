import React from "react"

export default (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g transform="translate(24 24) rotate(180)">
      <rect width="24" height="24" fill="none" />
      <path
        d="M9.99,20A10,10,0,1,1,20,10,10.006,10.006,0,0,1,9.99,20ZM10,2a8,8,0,1,0,8,8A8.009,8.009,0,0,0,10,2Zm1,13H9V13h2v2Zm0-4H9V5h2v6Z"
        transform="translate(2 2)"
      />
    </g>
  </svg>
)
