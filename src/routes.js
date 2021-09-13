import { lazy } from "react"

// const Home = lazy(() => import("views/Home"))
const Dashboard = lazy(() => import("views/Dashboard"))
const CarDetail = lazy(() => import("views/CarDetail"))
const NotFound = lazy(() => import("views/NotFound"))

const appRoutes = [
  // {
  //   path: "/",
  //   component: Home,
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: false,
    exact: false,
  },
  {
    path: "/cars/:id",
    component: CarDetail,
    isPrivate: false,
    exact: false,
  },
  {
    path: "*",
    component: NotFound,
    isPrivate: false,
    exact: false,
  },
]

export default appRoutes
