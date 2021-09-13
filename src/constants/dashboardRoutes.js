import { lazy } from "react"

const Cars = lazy(() => import("components/Dashboard/Cars"))
const GasStations = lazy(() => import("components/Dashboard/GasStations"))
const Marketplace = lazy(() => import("components/Dashboard/Marketplace"))
const RaceTrackLand = lazy(() => import("components/Dashboard/RaceTrackLand"))
const MechanicShops = lazy(() => import("components/Dashboard/MechanicShops"))
const ShoppingCart = lazy(() => import("components/Dashboard/ShoppingCart"))

const dashboardRoutes = [
  {
    path: "cars",
    component: Cars,
    isPrivate: false,
    exact: false,
  },
  {
    path: "gasstation",
    component: GasStations,
    isPrivate: false,
    exact: false,
  },
  {
    path: "marketplace",
    component: Marketplace,
    isPrivate: false,
    exact: false,
  },
  {
    path: "mechanic",
    component: MechanicShops,
    isPrivate: false,
    exact: false,
  },
  {
    path: "racetrack-land",
    component: RaceTrackLand,
    isPrivate: false,
    exact: false,
  },
  {
    path: "back-to-app",
    component: MechanicShops,
    isPrivate: false,
    exact: false,
  },
  {
    path: "cart",
    component: ShoppingCart,
    isPrivate: true,
    exact: false,
  },
]

export default dashboardRoutes
