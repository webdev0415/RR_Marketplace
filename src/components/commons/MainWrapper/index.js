import React, { useEffect, useMemo, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useWindowDimensions from "hooks/useWindowDimensions"
import IconButton from "components/commons/Button/IconButton"
import { IPAD_PORTRAIT } from "constants/breakPoints"
import { getUserMenu } from "constants/routes"
import Spinner from "../Spinner"
import "./styles.scss"

const MainWrapper = ({ title, className, loading, children }) => {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const { width } = useWindowDimensions()
  const subMenuRef = useRef()
  const containerStyle = useMemo(() => {
    if (className) {
      return `rioMainView ${className}`
    }
    return "rioMainView"
  }, [className])

  const userMenus = useMemo(() => getUserMenu(), [i18n.language])

  const isDashboardPage = pathname.includes("dashboard")
  const isSmallDevice = width <= IPAD_PORTRAIT

  const handleScroll = () => {
    if (subMenuRef.current) {
      const isSticky = subMenuRef.current.offsetTop - window.pageYOffset < 0
      if (isSticky) {
        subMenuRef.current.classList.add("sticky")
      } else {
        subMenuRef.current.classList.remove("sticky")
      }
    }
  }

  useEffect(() => {
    if (isSmallDevice && isDashboardPage) {
      window.addEventListener("scroll", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
    return null
  }, [isDashboardPage, isSmallDevice])

  if (loading) {
    return (
      <div className="innerBlock">
        <Spinner />
      </div>
    )
  }

  return (
    <div className={containerStyle}>
      <div className="rioPageHeader">
        <h2 className="heading1">{title}</h2>
      </div>
      {isDashboardPage && isSmallDevice && (
        <div className="rioSubMenu" ref={subMenuRef}>
          {userMenus.map((item, index) => (
            <Link to={item.route} key={index}>
              <IconButton
                icon={item.icon}
                label={item.title}
                className="tabButton rioSubMenuItem"
                actived={item.route === pathname}
              />
            </Link>
          ))}
        </div>
      )}
      <div className="rioPageContent">{children}</div>
    </div>
  )
}

export default MainWrapper
