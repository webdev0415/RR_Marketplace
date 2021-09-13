import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { getLandsSelector } from "store/redux/lands/selectors"
import { getLandsAction } from "store/redux/lands/actions"
import RioPagination from "components/commons/Pagination"
import MainWrapper from "components/commons/MainWrapper"
import LandsWrapper from "./LandsWrapper"
import "./styles.scss"

const RaceTrackLand = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    stations: [],
    landsTotalCounts: null,
    pageNumber: 1,
    pageSize: 12,
    showOnlyBuy: true,
    saleStatus: 1,
    currentDropShow: false,
  })
  const { lands: landsStore } = useSelector(getLandsSelector)

  useEffect(() => {
    if (landsStore)
      setState({
        ...state,
        stations: landsStore?.rows,
        landsTotalCounts: landsStore?.count,
      })
  }, [landsStore])

  const onChange = (pageNumber, pageSize) => {
    setState({ ...state, pageNumber, pageSize })
    dispatch(
      getLandsAction({
        page: pageNumber,
        size: pageSize,
        saleStatus: state.saleStatus,
        currentDrop: state.currentDropShow,
      })
    )
  }

  return (
    <MainWrapper title={t("lands.title")}>
      <LandsWrapper state={state} setState={setState} />
      <RioPagination
        defaultCurrent={1}
        current={state.pageNumber}
        total={state.landsTotalCounts}
        pageSize={state.pageSize}
        onChange={onChange}
        hideOnSinglePage={state.landsTotalCounts < 12}
      />
    </MainWrapper>
  )
}

export default RaceTrackLand
