import React, { useMemo, useRef } from "react"
import { Button } from "antd"
import PropTypes from "prop-types"

import "./button.scss"

const RioButton = ({
  children,
  varient,
  className,
  onClick,
  size,
  iconButton,
  ...rest
}) => {
  const btnRef = useRef()

  const classes = useMemo(() => {
    let base = "RioButton"
    if (varient) {
      base = `${base} ${varient}`
    }
    if (className) {
      base = `${base} ${className}`
    }
    if (size) {
      base = `${base} ${size}`
    }
    if (iconButton) {
      base = `${base} icon-button`
    }
    return base
  }, [varient, size, iconButton, className])

  const handleClick = (e) => {
    e.stopPropagation()
    if (btnRef.current) {
      btnRef.current.blur()
    }
    if (typeof onClick === "function") {
      onClick(e)
    }
  }

  return (
    <Button {...rest} onClick={handleClick} className={classes} ref={btnRef}>
      {children}
    </Button>
  )
}

RioButton.propTypes = {
  varient: PropTypes.string,
}

RioButton.defaultProps = {
  varient: "primary",
}

export default RioButton
