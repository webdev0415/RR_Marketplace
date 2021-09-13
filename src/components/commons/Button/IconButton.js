import React, { useMemo } from "react"

import "./iconButton.scss"

const IconButton = ({ onClick, icon, label, className, actived }) => {
  const classes = useMemo(() => {
    let base = "rioIconButton"
    if (className) {
      base = `${base} ${className}`
    }
    if (actived) {
      base = `${base} actived`
    }
    return base
  }, [className, actived])

  return (
    <div onClick={onClick} role="presentation" className={classes}>
      {icon}
      {label && <span>{label}</span>}
    </div>
  )
}

export default IconButton
