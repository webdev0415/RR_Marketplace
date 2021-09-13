import React, { useMemo } from "react"
import { Switch as AntSwitch } from "antd"

import "./styles.scss"

const Switch = ({ className, onChange, checked, ...rest }) => {
  const classes = useMemo(() => {
    let base = "RioSwitch"
    if (className) {
      base = `${base} ${className}`
    }
    return base
  }, [className])

  return (
    <AntSwitch
      {...rest}
      checked={checked}
      onChange={onChange}
      className={classes}
    />
  )
}

export default Switch
