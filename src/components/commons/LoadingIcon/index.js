import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const LoadingSpinner = ({ size }) => (
  <Spin
    indicator={
      <LoadingOutlined style={{ fontSize: size, color: "white" }} spin />
    }
  />
)

export default LoadingSpinner
