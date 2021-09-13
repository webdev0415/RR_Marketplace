import React from "react"
import { Tooltip } from "antd"

const CopyToClipElement = ({ content, children }) => {
  const copyToClipboard = () => {
    const el = document.createElement("textarea")
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }

  return (
    <Tooltip title="Copy" onClick={copyToClipboard} className="pointer">
      {children}
    </Tooltip>
  )
}

export default CopyToClipElement
