import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Drawer } from "antd"

import IconMenu from "components/commons/Icons/IconMenu"
import IconExit from "components/commons/Icons/IconExit"
import IconWallet from "components/commons/Icons/IconWallet"
import IconButton from "components/commons/Button/IconButton"
import logoWhite from "assets/images/logo_white.png"

import MobileSider from "./MobileSider"

import "./MobileHeader.scss"

const MobileHeader = ({ authState, OpenModal, handleLogout }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const [isOpenSide, setIsOpenSide] = useState(false)

  const toggleSider = () => {
    setIsOpenSide(!isOpenSide)
  }

  const isAuthorized = authState?.isLoggedIn

  useEffect(() => {
    setIsOpenSide(false)
  }, [pathname])

  return (
    <div className="headerMobile">
      <div className="leftContent">
        <IconButton icon={<IconMenu />} onClick={toggleSider} />
      </div>
      <div className="midContent">
        <Link to="/">
          <img src={logoWhite} alt="" />
        </Link>
      </div>
      <div className="rightContent">
        <IconButton
          icon={isAuthorized ? <IconWallet /> : <IconExit />}
          label={isAuthorized ? "" : t("start")}
          onClick={isAuthorized ? undefined : OpenModal}
        />
      </div>
      <Drawer
        placement="left"
        className="leftSiderMobile"
        closable={false}
        width={300}
        onClose={toggleSider}
        visible={isOpenSide}
      >
        <MobileSider handleLogout={handleLogout} />
      </Drawer>
    </div>
  )
}

export default MobileHeader
