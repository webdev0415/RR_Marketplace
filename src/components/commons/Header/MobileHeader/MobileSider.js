import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Collapse } from "antd"
import { Link, useLocation } from "react-router-dom"
import { getMainMenu } from "constants/routes"

import UserCard from "../../UserCard"
import LanguageSelector from "../../LanguageSelector"

import IconPlus from "../../Icons/IconPlus"
import IconMinus from "../../Icons/IconMinus"
import IconTerms from "../../Icons/IconTerms"
import IconPrivacy from "../../Icons/IconPrivacy"

import "./siderMenu.scss"

const MenuItem = ({ item, className }) => {
  const { pathname } = useLocation()
  const isActive = pathname === item.link
  const classes = useMemo(() => {
    let base = "rioMenuItem"
    if (className) {
      base = `${base} ${className}`
    }
    if (isActive) {
      base = `${base} active`
    }
    return base
  }, [isActive, className])

  return (
    <Link to={item.link}>
      <div className={classes}>
        {item.icon && <span className="rioMenuItemIcon">{item.icon}</span>}
        <span className="rioMenuItemLabel">{item.title}</span>
      </div>
    </Link>
  )
}

const { Panel } = Collapse

const CollapseIcon = ({ isActive }) => (isActive ? <IconMinus /> : <IconPlus />)

const CollapseHeader = ({ title, icon }) => (
  <div className="rioMenuItem">
    {icon && <span className="rioMenuItemIcon">{icon}</span>}
    <span className="rioMenuItemLabel">{title}</span>
  </div>
)

const MenuList = ({ item }) => {
  const [activeKey, setKey] = useState()
  const { pathname } = useLocation()
  const { title, menus, icon } = item

  useEffect(() => {
    if (pathname.includes("world")) {
      setKey(["1"])
    }
  }, [pathname])

  const handleChangeKey = (keys) => {
    setKey(keys)
  }

  if (Array.isArray(menus)) {
    return (
      <Collapse
        ghost
        bordered={false}
        expandIcon={CollapseIcon}
        expandIconPosition="right"
        activeKey={activeKey}
        onChange={handleChangeKey}
      >
        <Panel header={<CollapseHeader title={title} icon={icon} />} key="1">
          {menus.map((menu, idex) => (
            <MenuItem key={idex} item={menu} className="subMenuItem" />
          ))}
        </Panel>
      </Collapse>
    )
  }
  return <MenuItem item={item} />
}

const MobileSider = ({ handleLogout }) => {
  const { t, i18n } = useTranslation()
  const authState = useSelector((state) => state.auth)

  const sideOpts = useMemo(() => getMainMenu(), [i18n.language])

  return (
    <div className="rioSiderMenu">
      <div className="rioSiderMainMenu">
        {authState?.isLoggedIn && <UserCard />}

        {sideOpts.map((op, opIndx) => (
          <MenuList key={opIndx} item={op} />
        ))}
      </div>

      <div className="rioSiderFooter">
        <div className="rioMenuItem">
          <div className="rioMenuItemIcon">
            <IconTerms />
          </div>
          <div className="rioMenuItemLabel">Terms & Conditions</div>
        </div>
        <div className="rioMenuItem">
          <div className="rioMenuItemIcon">
            <IconPrivacy />
          </div>
          <div className="rioMenuItemLabel">Privacy Policy</div>
        </div>
        <div className="rioMenuItem">
          <LanguageSelector showlabel />
        </div>
        <div className="rioMenuItem" onClick={handleLogout}>
          <div className="rioMenuItemIcon" />
          <div className="rioMenuItemLabel">{t("logout")}</div>
        </div>
      </div>
    </div>
  )
}

export default MobileSider
