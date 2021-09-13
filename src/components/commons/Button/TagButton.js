import React, { useMemo } from "react"
import PropTypes from "prop-types"

import "./TagButton.scss"

const TagButton = ({
  varient,
  className,
  label,
  icon,
  actived,
  onClick,
  disabled,
}) => {
  const classes = useMemo(() => {
    let base = "RioTagButton"
    if (varient) {
      base = `${base} ${varient}`
    }
    if (className) {
      base = `${base} ${className}`
    }

    if (actived) {
      base = `${base} actived`
    }

    if (disabled) {
      base = `${base} disabled`
    }
    return base
  }, [varient, className, actived, disabled])

  const onClickHandler = (e) => {
    if (typeof onClick === "function" && !disabled) {
      onClick(e)
    }
  }

  return (
    <div className={classes} role="presentation" onClick={onClickHandler}>
      <span>{label}</span>
      <span>{icon}</span>
    </div>
  )
}

TagButton.propTypes = {
  varient: PropTypes.string,
}

TagButton.defaultProps = {
  varient: "",
}

export default TagButton
