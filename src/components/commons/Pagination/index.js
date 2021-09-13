import React from "react"
import PropTypes from "prop-types"
import { Pagination } from "antd"

import "./styles.scss"

const RioPagination = ({
  pageSize,
  defaultCurrent,
  current,
  total,
  onShowSizeChange,
  onChange,
  showSizeChanger,
  hideOnSinglePage,
}) => {
  const updatePagination = (...args) => {
    document
      ?.querySelector(".DashboardContent .scrollbar-container")
      ?.scrollTo(0, 20)
    onChange(...args)
  }
  return (
    <Pagination
      current={current}
      className="RioPagination"
      showSizeChanger={showSizeChanger}
      hideOnSinglePage={hideOnSinglePage}
      defaultCurrent={defaultCurrent}
      onShowSizeChange={onShowSizeChange}
      pageSizeOptions={Array(5)
        .fill(null)
        .map((_, index) => (index + 1) * 12)}
      total={total}
      defaultPageSize={pageSize}
      onChange={updatePagination}
    />
  )
}

RioPagination.propTypes = {
  showSizeChanger: PropTypes.bool,
}

RioPagination.defaultProps = {
  showSizeChanger: true,
}

export default RioPagination
