import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { debounce } from "lodash"
import MainWrapper from "components/commons/MainWrapper"
import RioPagination from "components/commons/Pagination"
import { getAllCarsAction, resetCarsAction } from "store/redux/cars/actions"
import { carsSelector, isLoadingCarsSelector } from "store/redux/cars/selectors"
import CarList from "./CarList"

import "./styles.scss"

const Container = () => {
  const [state, setState] = useState({
    pageNumber: 1,
    pageSize: 12,
    search: "",
    carType: ["All"],
    models: ["All"],
    showOnlyBuy: true,
    currentDropShow: false,
    saleStatus: 1,
  })

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isLoading = useSelector(isLoadingCarsSelector)

  const store = useSelector(carsSelector)

  const fetchCars = (filters) => {
    dispatch(
      getAllCarsAction({
        page: filters.pageNumber,
        size: filters.pageSize,
        search: filters.search,
        saleStatus: filters.showOnlyBuy ? 1 : undefined,
        modelFactory: filters.models.filter((x) => x !== "All"),
        classFactory: filters.carType.filter((x) => x !== "All"),
        currentDrop: filters.currentDropShow,
      })
    )
  }

  const debounceFetch = useRef(debounce(fetchCars, 300))

  const handleChangeState = (updated) => {
    debounceFetch.current(updated)
    setState({ ...updated })
  }

  const onChangePagination = (pageNumber, pageSize) => {
    handleChangeState({ ...state, pageNumber, pageSize })
  }

  useEffect(() => {
    fetchCars(state)

    return () => {
      dispatch(resetCarsAction())
    }
  }, [])

  return (
    <MainWrapper className="carStoreScreen" title={t("cars.title")}>
      <CarList
        state={state}
        setState={handleChangeState}
        items={store?.rows || []}
        total={store.count || 0}
      />
      {!isLoading && (
        <RioPagination
          defaultCurrent={1}
          current={state.pageNumber}
          pageSize={state.pageSize}
          total={store.count}
          hideOnSinglePage={store.count < 12}
          onChange={onChangePagination}
        />
      )}
    </MainWrapper>
  )
}

export default Container
