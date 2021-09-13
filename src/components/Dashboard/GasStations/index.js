import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { assetsStateSelector } from "store/redux/assets/selectors"
import { getStationsAction } from "store/redux/assets/actions"
import RioPagination from "components/commons/Pagination"
import MainWrapper from "components/commons/MainWrapper"
import GasStationsWrapper from "./gasStationsWrapper"
import "./styles.scss"

const GasStations = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    stations: [],
    stationTotalCounts: null,
    pageNumber: 1,
    pageSize: 12,
    showOnlyBuy: true,
    saleStatus: 1,
    currentDropShow: false,
  })
  const { stations: stationsStore } = useSelector(assetsStateSelector)

  useEffect(() => {
    if (stationsStore)
      setState({
        ...state,
        stations: stationsStore?.rows,
        stationTotalCounts: stationsStore?.count,
      })
  }, [stationsStore])

  const onChange = (pageNumber, pageSize) => {
    setState({ ...state, pageNumber, pageSize })

    if (state.showOnlyBuy) {
      dispatch(
        getStationsAction({
          page: pageNumber,
          size: pageSize,
          saleStatus: 1,
          currentDrop: state.currentDropShow,
        })
      )
    } else {
      dispatch(
        getStationsAction({
          page: pageNumber,
          size: pageSize,
          currentDrop: state.currentDropShow,
        })
      )
    }
  }
  return (
    <MainWrapper title={t("stations.title")}>
      <GasStationsWrapper state={state} setState={setState} />
      <RioPagination
        defaultCurrent={1}
        current={state.pageNumber}
        total={state.stationTotalCounts}
        pageSize={state.pageSize}
        onChange={onChange}
        hideOnSinglePage={state.stationTotalCounts < 12}
      />
    </MainWrapper>
  )
}

export default GasStations
