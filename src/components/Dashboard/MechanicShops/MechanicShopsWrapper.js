import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import { getShopsAction } from "store/redux/shops/actions"
import { shopsStateSelector } from "store/redux/shops/selectors"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { getCartAction } from "store/redux/marketplace/actions"
import { loadingSelector } from "store/redux/marketplace/selectors"
import Switch from "components/commons/Switch"
import LoadingSpinner from "components/commons/LoadingIcon"
import StationCard from "components/commons/Card/StationCard"

const MechanicShopsWrapper = ({ state, setState }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { shops: shopsStore } = useSelector(shopsStateSelector)
  const { loading } = useSelector(shopsStateSelector)
  const { buyLoading } = useSelector(loadingSelector)
  const isAuthorized = useSelector(isAuthorizedSelector)

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        getCartAction({
          page: 1,
          size: 24,
        })
      )
    }
    dispatch(
      getShopsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: state.saleStatus,
        currentDrop: state.currentDropShow,
      })
    )
  }, [buyLoading])

  useEffect(() => {
    if (shopsStore)
      setState({
        ...state,
        shops: shopsStore.rows,
        shopsTotalCounts: shopsStore.count,
      })
  }, [shopsStore])
  const toggleChangeShowEarn = (checked) => {
    setState({
      ...state,
      saleStatus: checked ? 1 : undefined,
      showOnlyBuy: checked,
    })
    dispatch(
      getShopsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: checked ? 1 : undefined,
        currentDrop: state.currentDropShow,
      })
    )
  }
  const toggleCurrentDropShow = (checked) => {
    setState({
      ...state,
      currentDropShow: checked,
    })
    dispatch(
      getShopsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: state.saleStatus,
        currentDrop: checked,
      })
    )
  }
  return (
    <div className="RioShops">
      <div className="shopsShowBarContainer">
        <div className="subtitle2">
          {t("shops.showing")}{" "}
          {state?.shopsTotalCounts?.toLocaleString("en-US")} {t("shops.title")}
        </div>
        <div>
          <div className="landsShowSwitch">
            <Switch
              checked={state.showOnlyBuy}
              onChange={toggleChangeShowEarn}
            />
            <div className="subtitle3 showAvailableText">
              {t("shops.onlyBuy")}
            </div>
          </div>
          <div className="landsShowSwitch">
            <Switch
              checked={state.currentDropShow}
              onChange={toggleCurrentDropShow}
            />
            <div className="subtitle3 showAvailableText">
              {t("shops.currentDropShow")}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loadingBar">
          <LoadingSpinner size={60} />
        </div>
      )}
      {!isEmpty(state.shops) && !loading && (
        <div className="StationGrid">
          {state?.shops?.map((station, index) => (
            <StationCard key={index} item={station} />
          ))}
        </div>
      )}
      {isEmpty(state.shops) && !loading && (
        <div className="emptyText">{t("shops.emptyText")}</div>
      )}
    </div>
  )
}

export default MechanicShopsWrapper
