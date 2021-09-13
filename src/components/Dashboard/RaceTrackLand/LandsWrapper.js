import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import { getLandsAction } from "store/redux/lands/actions"
import Switch from "components/commons/Switch"
import { landsStateSelector } from "store/redux/lands/selectors"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { getCartAction } from "store/redux/marketplace/actions"
import LoadingSpinner from "components/commons/LoadingIcon"
import { loadingSelector } from "store/redux/marketplace/selectors"
import LandCard from "components/commons/Card/StationCard"

const RacetrackLandsWrapper = ({ state, setState }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { lands: landsStore } = useSelector(landsStateSelector)
  const { loading } = useSelector(landsStateSelector)
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
      getLandsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: state.saleStatus,
      })
    )
  }, [buyLoading])

  useEffect(() => {
    if (landsStore)
      setState({
        ...state,
        lands: landsStore.rows,
        landsTotalCounts: landsStore.count,
      })
  }, [landsStore])
  const toggleChangeShowEarn = (checked) => {
    setState({
      ...state,
      saleStatus: checked ? 1 : undefined,
      showOnlyBuy: checked,
    })
    dispatch(
      getLandsAction({
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
      getLandsAction({
        page: state.pageNumber,
        size: state.pageSize,
        saleStatus: state.saleStatus,
        currentDrop: checked,
      })
    )
  }

  return (
    <div className="RioLands">
      <div className="stationShowBarContainer">
        <div className="subtitle2">
          {t("lands.showing")}{" "}
          {state?.landsTotalCounts?.toLocaleString("en-US")} {t("lands.title")}
        </div>
        <div>
          <div className="landsShowSwitch">
            <Switch
              checked={state.showOnlyBuy}
              onChange={toggleChangeShowEarn}
            />
            <div className="subtitle3 showAvailableText">
              {t("lands.onlyBuy")}
            </div>
          </div>
          <div className="landsShowSwitch">
            <Switch
              checked={state.currentDropShow}
              onChange={toggleCurrentDropShow}
            />
            <div className="subtitle3 showAvailableText">
              {t("lands.currentDropShow")}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loadingBar">
          <LoadingSpinner size={60} />
        </div>
      )}
      {!isEmpty(state.lands) && !loading && (
        <div className="StationGrid">
          {state?.lands?.map((station, index) => (
            <LandCard key={index} item={station} />
          ))}
        </div>
      )}
      {isEmpty(state.lands) && !loading && (
        <div className="emptyText">{t("lands.emptyText")}</div>
      )}
    </div>
  )
}

export default RacetrackLandsWrapper
