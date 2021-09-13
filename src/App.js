import React, { Suspense, useEffect } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { initialAuthenticateAction } from "store/redux/auth/actions"
import { authStateSelector } from "store/redux/auth/selectors"
import { getSettingsAction } from "store/redux/settings/actions"

import RouteWrapper from "components/RouteWrapper"
import ErrorBoundary from "components/ErrorBoundary"
import Loading from "components/commons/Loading"
import appRoutes from "routes"

import useIdleMonitor from "./hooks/useIdleMonitor"

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn, user, loading } = useSelector(authStateSelector)

  useIdleMonitor({
    delay: 1000, // timer delay in millisecond
    timeout: 60 * 120, // 2hrs in second
  })

  useEffect(() => {
    dispatch(initialAuthenticateAction())
    dispatch(getSettingsAction())
  }, [])

  const SwitchRoutes = (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {appRoutes.map((route) => (
            <RouteWrapper
              path={route.path}
              component={route.component}
              exact={route.exact}
              key={route.path}
              isPrivate={route.isPrivate}
              loading={loading}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          ))}
          <Redirect to="/dashboard/cars" />
        </Switch>
      </Router>
    </Suspense>
  )
  return <ErrorBoundary>{SwitchRoutes}</ErrorBoundary>
}

export default App
