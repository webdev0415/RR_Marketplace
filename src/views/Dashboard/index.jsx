import React from "react"
import { Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import DashboardLayout from "layout/DashboardLayout"
import RouteWrapper from "components/RouteWrapper"
import dashboardRoutes from "constants/dashboardRoutes"
import { authStateSelector } from "store/redux/auth/selectors"

function Dashboard(props) {
  const { path } = props
  const { isLoggedIn, user, loading } = useSelector(authStateSelector)

  return (
    <DashboardLayout>
      <Switch>
        {dashboardRoutes.map((route) => (
          <RouteWrapper
            path={`${path}/${route.path}`}
            component={route.component}
            exact={route.exact}
            key={route.path}
            isPrivate={route.isPrivate}
            loading={loading}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        ))}
      </Switch>
    </DashboardLayout>
  )
}

export default Dashboard
