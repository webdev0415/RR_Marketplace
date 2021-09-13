import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Badge, Popover } from "antd"
import { cartTotalCountSelector } from "store/redux/marketplace/selectors"
import { getCartAction } from "store/redux/marketplace/actions"
import IconCart from "components/commons/Icons/IconCart"

const CartButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { totalCount } = useSelector(cartTotalCountSelector)

  const handleCartClick = () => {
    history.push("/dashboard/cart")
  }

  useEffect(() => {
    // TODO: move to this action to the auth saga
    dispatch(getCartAction({ page: 1, size: 24 }))
  }, [])

  if (!totalCount) {
    return (
      <Popover content={t("cart.emptyText")}>
        <div className="cartWrapp">
          <IconCart onClick={handleCartClick} />
        </div>
      </Popover>
    )
  }

  return (
    <Badge
      count={totalCount}
      style={{
        backgroundColor: "#03DAC5",
        color: "#000",
        boxShadow: "none",
      }}
    >
      <div className="cartWrapp">
        <IconCart onClick={handleCartClick} />
      </div>
    </Badge>
  )
}

export default CartButton
