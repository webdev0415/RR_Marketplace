import React from "react"
import i18n from "i18n"
import { notification as antNotification } from "antd"
import { EXTRA_DESKTOP } from "constants/breakPoints"
import IconCirCheck from "components/commons/Icons/IconCirCheck"
import IconCirClose from "components/commons/Icons/IconCirClose"
import IconCirInfo from "components/commons/Icons/IconCirInfo"

import "./styles.scss"

const iconMap = {
  success: <IconCirCheck />,
  error: <IconCirClose />,
  info: <IconCirInfo />,
  warning: <IconCirInfo />,
}

// TODO: to be applied custom styles
const notification = (options) => {
  const { type = "error", title, desc, ...rest } = options || {}
  const isExtra = window.innerWidth >= EXTRA_DESKTOP

  antNotification.open({
    ...rest,
    type,
    className: "custom-ant-notification",
    message: title || i18n.t("apologize"),
    icon: iconMap[type],
    top: isExtra ? 150 : 120,
    description: <div className={desc ? "mt20" : "hidden"}>{desc}</div>,
  })
}

export default notification
