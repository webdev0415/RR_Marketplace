import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Input as AntInput } from "antd"

import "./input.scss"

const RioInput = ({
  varient,
  className,
  label,
  error,
  value,
  onFocus,
  onBlur,
  suffix,
  disabled,
  inputRef,
  ...rest
}) => {
  const [focused, setFocused] = useState(false)
  const classes = useMemo(() => {
    let baseStyle = "rioInput"
    if (varient) {
      baseStyle = `${baseStyle} ${varient}`
    }
    if (className) {
      baseStyle = `${baseStyle} ${className}`
    }
    if (value || focused) {
      baseStyle = `${baseStyle} focused`
    }
    if (suffix) {
      baseStyle = `${baseStyle} suffix`
    }
    if (error) {
      baseStyle = `${baseStyle} hasError`
    }
    if (disabled) {
      baseStyle = `${baseStyle} disabled`
    }
    return baseStyle
  }, [varient, className, error, value, focused, suffix, disabled])

  const handleFocused = (e) => {
    if (disabled) {
      return
    }
    setFocused(true)
    if (typeof onFocus === "function") {
      onFocus(e)
    }
  }

  const handleBlur = (e) => {
    if (disabled) {
      return
    }
    setFocused(false)
    if (typeof onBlur === "function") {
      onBlur(e)
    }
  }

  return (
    <div className={classes}>
      <div className="rioInput--inner">
        <div className="rioInput--label">{label}</div>
        <AntInput
          {...rest}
          value={value}
          ref={inputRef}
          disabled={disabled}
          onFocus={handleFocused}
          onBlur={handleBlur}
        />
        {suffix && <div className="rioInput--suffix">{suffix}</div>}
      </div>
      {error && <div className="rioInput--helper">{error}</div>}
    </div>
  )
}

RioInput.propTypes = {
  varient: PropTypes.string,
}

RioInput.defaultProps = {
  varient: "filled",
}

export default RioInput
