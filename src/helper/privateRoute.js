import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/patient-app/login" />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.shape({}),
}

PrivateRoute.defaultProps = {
  auth: {},
}

export default PrivateRoute
