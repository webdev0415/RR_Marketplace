import React, { useMemo } from "react"
import "./styles.scss"

const RioCard = ({ className, children }) => {
  const classes = useMemo(() => {
    let base = "RioCardWrapper"
    if (className) {
      base = `${base} ${className}`
    }
    return base
  }, [className])
  return <div className={classes}>{children}</div>
}

export default RioCard
