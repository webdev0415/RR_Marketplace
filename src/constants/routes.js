import React from "react"
import i18n from "i18n"

import IconRio from "components/commons/Icons/IconRio"
import IconHome from "components/commons/Icons/IconHome"
import IconCar from "components/commons/Icons/IconCar"
import IconCart from "components/commons/Icons/IconCart"
import IconMechanic from "components/commons/Icons/IconMechanic"
import IconRace from "components/commons/Icons/IconRace"
import IconGasStation from "components/commons/Icons/IconGasStation"
import IconRacetrack from "components/commons/Icons/IconRacetrack"

export const getMainMenu = () => [
  { title: i18n.t("menu.theShop"), link: "/shop", icon: <IconHome /> },
  {
    title: i18n.t("menu.theWorld"),
    icon: <IconRio />,
    menus: [
      { title: i18n.t("menu.fuelMe"), link: "/world" },
      {
        title: i18n.t("menu.visitMechanic"),
        link: "/world/machenic",
      },
      { title: i18n.t("menu.theTracks"), link: "/world/tracks" },
      {
        title: i18n.t("menu.billboards"),
        link: "/world/billboards",
      },
    ],
  },
  { title: i18n.t("menu.letRace"), link: "/letsrace", icon: <IconRace /> },
]

export const getUserMenu = () => [
  // {
  //   title: "Home",
  //   route: "/dashboard/marketplace",
  //   icon: <IconHome />,
  // },
  {
    title: i18n.t("menu.cars"),
    route: "/dashboard/cars",
    icon: <IconCar />,
  },
  {
    title: i18n.t("menu.gasStations"),
    route: "/dashboard/gasstation",
    icon: <IconGasStation />,
  },
  {
    title: i18n.t("menu.mechanic"),
    route: "/dashboard/mechanic",
    icon: <IconMechanic />,
  },
  {
    title: i18n.t("menu.land"),
    route: "/dashboard/racetrack-land",
    icon: <IconRacetrack />,
  },
]

export const getUserBottomMenu = () => [
  {
    title: i18n.t("menu.cart"),
    route: "/dashboard/cart",
    icon: <IconCart />,
  },
]

export const MAIN_APP_URL = process.env.REACT_APP_MAIN_APP_URL
