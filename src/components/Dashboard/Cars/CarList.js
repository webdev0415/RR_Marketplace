import React, { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import { useHistory } from "react-router-dom"

import FilterBar from "components/commons/FilterBar"
import LoadingSpinner from "components/commons/LoadingIcon"
import CarCard from "components/commons/Card/CarCard"

import { isLoadingCarsSelector } from "store/redux/cars/selectors"

import { getSortedItems } from "./utils"

const CarList = ({ items, total, state, setState }) => {
  const history = useHistory()
  const { t, i18n } = useTranslation()

  const isLoading = useSelector(isLoadingCarsSelector)

  const sortOpts = useMemo(
    () => [
      {
        key: "name",
        label: t("garage.name"),
        direction: "asc",
      },
      {
        key: "experiencePoints",
        label: t("garage.xp"),
        direction: "asc",
      },
      {
        key: "carRating",
        label: t("garage.rating"),
        direction: "asc",
      },
      {
        key: "modelFactory",
        label: t("garage.model"),
        direction: "asc",
      },
    ],
    [i18n.language]
  )

  const [sort, setSort] = useState(sortOpts[0])

  const showDetail = (carId) => {
    history.push(`/cars/${carId}`)
  }

  const itemsToRender = useMemo(() => {
    if (isEmpty(items)) {
      return []
    }
    return getSortedItems(items, sort)
  }, [items, sort])

  return (
    <div className="RioCars">
      <FilterBar
        sort={sort}
        sortOpts={sortOpts}
        setSort={setSort}
        state={state}
        total={total}
        loading={isLoading}
        setState={setState}
      />
      {isLoading && (
        <div className="loadingBar">
          <LoadingSpinner size={60} />
        </div>
      )}
      {!isEmpty(itemsToRender) && !isLoading && (
        <div className="CarGrid">
          {itemsToRender?.map((car, index) => (
            <CarCard
              item={car}
              key={index}
              onShowDetail={() => showDetail(car.id)}
            />
          ))}
        </div>
      )}
      {isEmpty(itemsToRender) && !isLoading && (
        <div className="emptyText">{t("cars.emptyText")}</div>
      )}
    </div>
  )
}

export default CarList
