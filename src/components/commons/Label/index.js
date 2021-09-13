import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Tooltip } from "antd"
import IconCircleHelp from "../Icons/IconCircleHelp"

import "./label.scss"

/**
 * @param {string} className override the label class, optional
 * @param {string} label text to show, required
 * @param {string} helperKey to show/hide tooltip and question mark, optional
 * @returns ReactNode
 */

const RioLabel = ({ className, label, helperKey }) => {
  const [t] = useTranslation()
  const classes = useMemo(() => {
    let base = "RioLabel"
    if (className) {
      base = `${base} ${className}`
    }
    return base
  }, [className])

  const helperText = helperKey ? t(`helperText.${helperKey}`) : ""

  return (
    <div className={classes}>
      <span className="heading3">{label}</span>
      {helperKey && (
        <Tooltip title={helperText}>
          <span className="helpIcon">
            <IconCircleHelp />
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export default RioLabel
