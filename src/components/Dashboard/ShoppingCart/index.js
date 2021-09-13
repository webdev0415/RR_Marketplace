import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { isEmpty, get } from "lodash"

import {
  cartSelector,
  loadingSelector,
} from "store/redux/marketplace/selectors"
import { getCartAction } from "store/redux/marketplace/actions"

import MainWrapper from "components/commons/MainWrapper"
import LoadingSpinner from "components/commons/LoadingIcon"
import RioPagination from "components/commons/Pagination"
import CartCard from "components/commons/Card/CartCard"

import "./styles.scss"

const ShoppingCart = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { cart: cartStore } = useSelector(cartSelector)
  const { loading: cartLoading } = useSelector(loadingSelector)

  const [state, setState] = useState({
    pageNumber: 1,
    pageSize: 12,
  })

  const showDetail = (item) => {
    const assetType = get(item, "transaction.assetType")
    if (assetType === "car") {
      history.push(`/cars/${item.id}`)
    }
  }

  const onChange = (pageNumber) => {
    setState({ ...state, pageNumber })
    dispatch(
      getCartAction({
        page: pageNumber,
        size: state.pageSize,
      })
    )
  }

  return (
    <MainWrapper title={t("cart.title")}>
      <div className="RioCars">
        {cartLoading && (
          <div className="loadingBar">
            <LoadingSpinner size={60} />
          </div>
        )}
        {!isEmpty(cartStore?.rows) && !cartLoading && (
          <div className="CarGrid">
            {cartStore?.rows?.map((item) => (
              <CartCard
                item={item}
                key={`${item.id}_${item.transaction.assetType}`}
                onShowDetail={() => showDetail(item)}
              />
            ))}
          </div>
        )}
        {isEmpty(cartStore?.rows) && !cartLoading && (
          <div className="emptyText">{t("cart.emptyText")}</div>
        )}
      </div>
      {!cartLoading && (
        <RioPagination
          defaultCurrent={1}
          current={cartStore?.page}
          total={cartStore?.count}
          pageSize={state.pageSize}
          hideOnSinglePage={cartStore?.count < 12}
          onChange={onChange}
        />
      )}
    </MainWrapper>
  )
}

export default ShoppingCart
