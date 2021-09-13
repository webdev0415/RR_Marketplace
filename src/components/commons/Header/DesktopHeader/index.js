import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Affix } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { getCartAction } from "store/redux/marketplace/actions"

import logoOrange from "assets/images/logo-orange.png"
import LanguageSelector from "../../LanguageSelector"
import RioButton from "../../Button"
import UserMenu from "./UserMenu"
import UserBallance from "./UserBallance"
import CartButton from "./CartButton"

import "./styles.scss"

const DesktopHeader = ({ handleLogout, OpenModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuthorized = useSelector(isAuthorizedSelector)

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getCartAction({ page: 1, size: 24 }))
    }
  }, [])

  return (
    <Affix offsetTop={0}>
      <div className="HeaderDesktop">
        <div className="HeaderLeft">
          <div className="HeaderLogo">
            <Link to="/dashboard/cars">
              <img src={logoOrange} alt="Riot" />
            </Link>
          </div>
          <div className="PageMenu">
            <Link to="/dashboard/cars">{t("marketPlace")}</Link>
          </div>
        </div>

        <div className="HeaderRight">
          <LanguageSelector showlabel={false} />

          {isAuthorized && (
            <>
              <CartButton />
              <UserBallance />
              <UserMenu handleLogout={handleLogout} />
            </>
          )}

          {!isAuthorized && (
            <RioButton onClick={OpenModal} className="ml30">
              {t("start")}
            </RioButton>
          )}
        </div>
      </div>
    </Affix>
  )
}

export default DesktopHeader
