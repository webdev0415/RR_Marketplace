import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Checkbox as AntCheckbox } from "antd"

import "./styles.scss"

const RioCheckbox = ({ varient, children, className, onChange, checked }) => {
  const classes = useMemo(() => {
    let base = "RioCheckbox"
    if (varient) {
      base = `${base} ${varient}`
    }
    if (className) {
      base = `${base} ${className}`
    }

    return base
  }, [varient, className])

  return (
    <AntCheckbox className={classes} onChange={onChange} checked={checked}>
      {children}
    </AntCheckbox>
  )
}

RioCheckbox.propTypes = {
  varient: PropTypes.string,
}

RioCheckbox.defaultProps = {
  varient: "primary",
}

export default RioCheckbox
