import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { getShopsSelector } from "store/redux/shops/selectors"
import { getShopsAction } from "store/redux/shops/actions"
import RioPagination from "components/commons/Pagination"
import MainWrapper from "components/commons/MainWrapper"
import MechanicShopsWrapper from "./MechanicShopsWrapper"
import "./styles.scss"

const MechanicShops = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    shops: [],
    shopsTotalCounts: null,
    pageNumber: 1,
    pageSize: 12,
    showOnlyBuy: true,
    saleStatus: 1,
    currentDropShow: false,
  })
  const { shops: shopsStore } = useSelector(getShopsSelector)

  useEffect(() => {
    if (shopsStore)
      setState({
        ...state,
        shops: shopsStore?.rows,
        shopsTotalCounts: shopsStore?.count,
      })
  }, [shopsStore])

  const onChange = (pageNumber, pageSize) => {
    setState({ ...state, pageNumber, pageSize })
    dispatch(
      getShopsAction({
        page: pageNumber,
        size: pageSize,
        saleStatus: state.saleStatus,
        currentDrop: state.currentDropShow,
      })
    )
  }

  return (
    <MainWrapper title={t("shops.title")}>
      <MechanicShopsWrapper state={state} setState={setState} />
      <RioPagination
        defaultCurrent={1}
        current={state.pageNumber}
        total={state.shopsTotalCounts}
        pageSize={state.pageSize}
        onChange={onChange}
        hideOnSinglePage={state.shopsTotalCounts < 12}
      />
    </MainWrapper>
  )
}

export default MechanicShops
