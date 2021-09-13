import React, { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { getUserMenu, getUserBottomMenu, MAIN_APP_URL } from "constants/routes"
import IconRio from "components/commons/Icons/IconRio"

import "./styles.scss"

const SideMenu = () => {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const opts = useMemo(getUserMenu, [i18n.language])
  const bottomOpts = useMemo(getUserBottomMenu, [i18n.language])
  const isAuthorized = useSelector(isAuthorizedSelector)

  return (
    <div className="DashboardSideMenu">
      <PerfectScrollbar>
        {opts.map((elem, index) => (
          <Link to={elem.route} key={index}>
            <div
              className={
                pathname === elem.route ? "SideMenuItem active" : "SideMenuItem"
              }
            >
              {elem.icon}
              <span>{elem.title}</span>
            </div>
          </Link>
        ))}

        <div className="SideMenuBottom">
          {isAuthorized &&
            bottomOpts.map((elem, index) => (
              <Link to={elem.route} key={index}>
                <div
                  className={
                    pathname === elem.route
                      ? "SideMenuItem MenuBottomItem active"
                      : "SideMenuItem MenuBottomItem"
                  }
                >
                  {elem.icon}
                  <span>{elem.title}</span>
                </div>
              </Link>
            ))}
          <a href={MAIN_APP_URL}>
            <div className="SideMenuItem MenuBottomItem">
              <IconRio />
              <span>{i18n.t("menu.backToApp")}</span>
            </div>
          </a>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default SideMenu
