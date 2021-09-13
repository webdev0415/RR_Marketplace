import React from "react"
import { isEmpty } from "lodash"
import AddToCart from "components/commons/AddToCart"

import "./styles.scss"

const PageHeader = ({ item }) => (
  <div className="CardPageHeader">
    <span className="headingExtra">
      {`#${item.id || ""} ${item.name || ""}`}
    </span>
    {!isEmpty(item?.transaction) && (
      <span className="headerAction">
        <AddToCart item={item} iconButton />
      </span>
    )}
  </div>
)

export default PageHeader
