import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function RouteWrapper({
  component: Component,
  isPrivate,
  loading,
  ...rest
}) {
  if (isPrivate) {
    if (rest.isLoggedIn === true) {
      return <Route render={(props) => <Component {...props} {...rest} />} />
    }
    return <Redirect to="/dashboard/cars" />
  }
  return <Route render={(props) => <Component {...props} {...rest} />} />
}
