import React, { useMemo } from "react"
import { Menu, Dropdown } from "antd"
import { useTranslation } from "react-i18next"
import IconUs from "../Icons/IconUs"
import IconFR from "../Icons/IconFR"
import IconES from "../Icons/IconES"
import IconRU from "../Icons/IconRU"
import IconZh from "../Icons/IconZh"
import IconJp from "../Icons/IconJp"
import IconKr from "../Icons/IconKr"
import IconDe from "../Icons/IconDe"

import "./style.scss"

const countries = [
  { code: "en", label: "English", icon: <IconUs /> },
  { code: "es", label: "Spanish", icon: <IconES /> },
  { code: "fr", label: "French", icon: <IconFR /> },
  { code: "ru", label: "Russian", icon: <IconRU /> },
  { code: "de", label: "German", icon: <IconDe /> },
  { code: "zh", label: "Chinese", icon: <IconZh /> },
  { code: "jp", label: "Japanse", icon: <IconJp /> },
  { code: "kr", label: "Korean", icon: <IconKr /> },
]

function LanguageSelector({ showlabel }) {
  const { i18n } = useTranslation()

  const changeLanguage = ({ key: selected }) => {
    i18n.changeLanguage(selected)
  }

  const languageOverlay = (
    <Menu onClick={changeLanguage} className="RioLanguageMenu">
      {countries.map((country) => (
        <Menu.Item
          key={country.code}
          icon={country.icon}
          className={i18n.language === country.code ? "active" : ""}
        >
          <span>{country.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  const selected = useMemo(() => {
    const county =
      countries.find((c) => c.code === i18n.language) || countries[0]
    return (
      <div
        className={
          showlabel ? "RioLanguageTrigerWithLabel" : "RioLanguageTriger"
        }
      >
        {county.icon}
        {showlabel && <span>{county.label}</span>}
      </div>
    )
  }, [i18n.language, showlabel])

  return (
    <Dropdown
      overlay={languageOverlay}
      trigger="click"
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
    >
      {selected}
    </Dropdown>
  )
}

export default LanguageSelector
