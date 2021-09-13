import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Menu } from "antd"
import { Link, useLocation } from "react-router-dom"
import IconTrigDown from "../../Icons/IconTrigDown"
import { getMainMenu } from "constants/routes"

const { Item: MenuItem, SubMenu } = Menu

const subMenuKey = "MainSubMenu1"

const MainMenu = () => {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const pageMenuItems = useMemo(() => getMainMenu(), [i18n.language])

  return (
    <Menu mode="horizontal" triggerSubMenuAction="click">
      {pageMenuItems.map((item, itemIndex) => {
        if (Array.isArray(item.menus) && item.menus.length > 0) {
          return (
            <SubMenu
              key={subMenuKey}
              title={item.title}
              icon={<IconTrigDown />}
              className={pathname.includes("/world") ? "active" : ""}
            >
              {item.menus.map((subItem, subItemIndex) => (
                <MenuItem
                  key={`submenu:${subItemIndex}`}
                  className={pathname === subItem.link ? "active" : ""}
                >
                  <Link to={subItem.link}>{subItem.title}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          )
        }
        return (
          <MenuItem
            key={itemIndex}
            className={pathname === item.link ? "active" : ""}
          >
            <Link to={item.link}>{item.title}</Link>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default MainMenu
