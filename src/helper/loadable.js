import React, { lazy, Suspense } from "react"
import PropTypes from "prop-types"

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc)

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

loadable.propTypes = {
  importFunc: PropTypes.func.isRequired,
}
export default loadable
