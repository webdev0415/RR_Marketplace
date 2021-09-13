import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import { getStationsAction } from "store/redux/assets/actions"
import Switch from "components/commons/Switch"
import { assetsStateSelector } from "store/redux/assets/selectors"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { getCartAction } from "store/redux/marketplace/actions"
import LoadingSpinner from "components/commons/LoadingIcon"
import StationCard from "components/commons/Card/StationCard"
import { loadingSelector } from "store/redux/marketplace/selectors"

const GasStationsWrapper = ({ state, setState }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { stations: stationsStore } = useSelector(assetsStateSelector)
  const { loading } = useSelector(assetsStateSelector)
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
      getStationsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: state.saleStatus,
        currentDrop: state.currentDropShow,
      })
    )
  }, [buyLoading])

  useEffect(() => {
    if (stationsStore)
      setState({
        ...state,
        stations: stationsStore.rows,
        stationTotalCounts: stationsStore.count,
      })
  }, [stationsStore])
  const toggleChangeShowEarn = (checked) => {
    setState({
      ...state,
      saleStatus: checked ? 1 : undefined,
      showOnlyBuy: checked,
    })
    dispatch(
      getStationsAction({
        page: 1,
        size: state.pageSize,
        saleStatus: checked ? 1 : undefined,
        currentDrop: checked,
      })
    )
  }
  const toggleCurrentDropShow = (checked) => {
    setState({
      ...state,
      currentDropShow: checked,
    })
    dispatch(
      getStationsAction({
        page: 1,
        size: state.pageSize,
        saleStatus: state.saleStatus,
        currentDrop: checked,
      })
    )
  }
  return (
    <div className="RioStationss">
      <div className="stationShowBarContainer">
        <div className="subtitle2">
          {t("stations.showing")}{" "}
          {state?.stationTotalCounts?.toLocaleString("en-US")}{" "}
          {t("stations.title")}{" "}
        </div>
        <div>
          <div className="stationShowSwitch">
            <Switch
              checked={state.showOnlyBuy}
              onChange={toggleChangeShowEarn}
            />
            <div className="subtitle3 showAvailableText">
              {t("cars.onlyBuy")}
            </div>
          </div>
          <div className="stationShowSwitch">
            <Switch
              checked={state.currentDropShow}
              onChange={toggleCurrentDropShow}
            />
            <div className="subtitle3 showAvailableText">
              {t("cars.currentDropShow")}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loadingBar">
          <LoadingSpinner size={60} />
        </div>
      )}
      {!isEmpty(state.stations) && !loading && (
        <div className="StationGrid">
          {state?.stations?.map((station, index) => (
            <StationCard key={index} item={station} />
          ))}
        </div>
      )}
      {isEmpty(state.stations) && !loading && (
        <div className="emptyText">{t("stations.emptyText")}</div>
      )}
    </div>
  )
}

export default GasStationsWrapper
