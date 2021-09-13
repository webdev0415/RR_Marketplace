import React from "react"
import PropTypes from "prop-types"
import CirProgress from "../Icons/IconCirProgress"

import "./spinner.scss"

const Spinner = ({ size }) => (
  <div className="ant-loader">
    <div className="ant-spin ant-spin-lg ant-spin-spinning">
      <CirProgress className="anticon-spin" />
    </div>
  </div>
)

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "large", "default"]),
}
Spinner.defaultProps = {
  size: "large",
}

export default Spinner
