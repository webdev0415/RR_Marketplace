import React from "react"
import { Dropdown, Menu } from "antd"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import TagButton from "components/commons/Button/TagButton"
import IconTrigDown from "components/commons/Icons/IconTrigDown"
import IconSortDown from "components/commons/Icons/IconSortDown"
import IconSortUp from "components/commons/Icons/IconSortUp"
import Switch from "components/commons/Switch"

import { CAR_CLASSES, CAR_MODELS } from "./constants"

import "./styles.scss"

const FilterBar = ({
  loading,
  total,
  state,
  setState,
  sortOpts,
  sort,
  setSort,
}) => {
  const { t } = useTranslation()

  const toggleChangeShowEarn = (checked) => {
    setState({
      ...state,
      pageNumber: 1,
      saleStatus: checked ? 1 : undefined,
      showOnlyBuy: checked,
    })
  }

  const toggleCurrentDropShow = (checked) => {
    setState({
      ...state,
      pageNumber: 1,
      currentDropShow: checked,
    })
  }

  const handleChangeFilter = (prop, op) => {
    let newFilters = []
    if (op === "All") {
      newFilters = ["All"]
    } else if (state[prop].includes(op)) {
      newFilters = state[prop].filter((x) => x !== "All" && x !== op)
    } else {
      newFilters = state[prop].filter((x) => x !== "All").concat([op])
    }

    if (isEmpty(newFilters)) {
      newFilters = ["All"]
    }

    setState({
      ...state,
      pageNumber: 1,
      [prop]: newFilters,
    })
  }

  const handlSort = ({ key }) => {
    if (sort.key !== key && key) {
      setSort({ ...sort, key, direction: "asc" })
    } else if (sort.direction === "asc") {
      setSort({ ...sort, direction: "des" })
    } else {
      setSort({ ...sort, direction: "asc" })
    }
  }

  const sortOverlay = (
    <Menu onClick={handlSort}>
      {sortOpts.map((op) => (
        <Menu.Item key={op.key}>{op.label}</Menu.Item>
      ))}
    </Menu>
  )

  const sortToRender = sortOpts.find((op) => op.key === sort.key)

  return (
    <div className="FilterContainer">
      <div className="CarFilterAndSort">
        <div className="FilterBlock">
          <div className="CarFilterOptions">
            {CAR_CLASSES.map((op) => (
              <TagButton
                key={op.key}
                label={t(`car.classes.${op.key}`)}
                actived={state.carType.includes(op.value)}
                onClick={() => handleChangeFilter("carType", op.value)}
              />
            ))}
          </div>
          <div className="CarFilterOptions">
            {CAR_MODELS.map((op) => (
              <TagButton
                key={op}
                label={op}
                actived={state.models.includes(op)}
                onClick={() => handleChangeFilter("models", op)}
              />
            ))}
          </div>
        </div>
        <div className="SortAndSwitch">
          <div className="SortButton">
            <span role="presentation" onClick={handlSort} className="SortIcon">
              {sort.direction === "asc" ? <IconSortDown /> : <IconSortUp />}
            </span>
            <span className="SortButtonText heading3">{t("sortBy")}</span>
            <Dropdown
              overlay={sortOverlay}
              trigger="click"
              getPopupContainer={(triger) => triger.parentNode}
            >
              <span className="selected heading3">
                {sortToRender.label}
                <IconTrigDown />
              </span>
            </Dropdown>
          </div>
          <div className="CarShowSwitch">
            <Switch
              checked={state.showOnlyBuy}
              onChange={toggleChangeShowEarn}
            />
            <div className="subtitle3 showAvailableText">
              {t("cars.onlyBuy")}
            </div>
          </div>
          <div className="CarShowSwitch">
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
      <div className="subtitle2">
        {loading ? "" : `${t("cars.showing")} ${total} ${t("cars.title")}`}
      </div>
    </div>
  )
}

export default FilterBar
