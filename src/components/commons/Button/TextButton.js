import React, { useMemo } from "react"
import IconCaretRight from "../Icons/IconCaretRight"

import "./TextButton.scss"

const RioTextButton = ({ text, varient, className, onClick }) => {
  const classes = useMemo(() => {
    let baseStyle = "RioTextButton"
    if (varient) {
      baseStyle = `${baseStyle} ${varient}`
    }
    if (className) {
      baseStyle = `${baseStyle} ${className}`
    }
    return baseStyle
  }, [varient, className])

  return (
    <div className={classes} role="presentation" onClick={onClick}>
      <span>{text}</span>
      <IconCaretRight />
    </div>
  )
}

export default RioTextButton
