import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"

import { getCarAction } from "store/redux/car/actions"
import { currentCarSelector } from "store/redux/car/selectors"

import MainWrapper from "components/commons/MainWrapper"
import DefaultLayout from "layout/DefaultLayout"
import Loading from "components/commons/Loading"
import RioLabel from "components/commons/Label"
import CarCard from "./CarCard"
import SalesHistory from "./SalesHistory"
import PageHeader from "./Header"

import "./styles.scss"

function CarDetail({ computedMatch: match }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // TODO: salesData should be retrieved from backend.
  const {
    currentCar = {},
    loading,
    salesData = [],
  } = useSelector(currentCarSelector)
  const { id: carId } = match.params

  useEffect(() => {
    dispatch(getCarAction({ carId }))
  }, [])

  if (loading || isEmpty(currentCar)) {
    return <Loading />
  }

  return (
    <DefaultLayout>
      <MainWrapper className="CarDetailContainer">
        <div className="LeftContent">
          <RioLabel
            className="carCardTitle"
            label={<PageHeader item={currentCar} />}
          />
          <CarCard showSummary item={currentCar} />
        </div>
        <div className="RightContent">
          <div className="SalesHisotryBlock">
            <RioLabel label={t("salesHistories")} />
            <SalesHistory histories={salesData} />
          </div>
        </div>
      </MainWrapper>
    </DefaultLayout>
  )
}

export default CarDetail
