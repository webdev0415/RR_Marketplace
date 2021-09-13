import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"

import "./styles.scss"

const RioTable = ({ title, source, columns, className }) => (
  <div className={`rio-table ${className || ""}`}>
    {title && <div className="rio-table-header">{title}</div>}
    <Table
      dataSource={source}
      columns={columns}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  </div>
)

RioTable.propTypes = {
  title: PropTypes.node,
}

RioTable.defaultProps = {
  title: "",
}

export default RioTable
