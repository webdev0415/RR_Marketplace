import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Progress } from "antd"
import { round } from "lodash"

import "./styles.scss"

const RioProgressBar = ({ varient, className, max, value, label, type }) => {
  const classes = useMemo(() => {
    let base = "RioProgressBar"
    if (varient) {
      base = `${base} ${varient}`
    }
    if (className) {
      base = `${base} ${className}`
    }
    if (type) {
      base = `${base} ${type}`
    }
    return base
  }, [varient, className, type])

  // Antd Progress doesn't support max value
  const innerValue = useMemo(() => round((100 / max) * value), [max, value])

  const labelClasses = useMemo(() => {
    if (value <= 0) {
      return "start"
    }
    if (value > 0 && value < max) {
      return "progress"
    }
    if (value >= max) {
      return "completed"
    }
    return ""
  }, [value, max])

  return (
    <div className={classes}>
      {type === "line" && (
        <div className="RioLineProgressBarLabel">
          <span>{label}</span>
          <span className={labelClasses}>
            {value} of {max}
          </span>
        </div>
      )}
      {type !== "line" && <div className="heading2">{label}</div>}
      <Progress
        percent={innerValue}
        showInfo={type !== "line"}
        format={() => value}
        type={type}
      />
      {type !== "line" && (
        <div className="subtitle3">
          {value} / {max}
        </div>
      )}
    </div>
  )
}

RioProgressBar.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
  varient: PropTypes.string,
  type: PropTypes.oneOf(["circle", "line", "dashboard"]),
}

RioProgressBar.defaultProps = {
  max: 100,
  value: 0,
  type: "line",
  varient: "primary",
}

export default RioProgressBar
