import React from "react"
import { useTranslation } from "react-i18next"
import RioCard from "components/commons/Card/RioCard"
import MediaPlayer from "components/commons/Media"
import RioTextButton from "components/commons/Button/TextButton"
import GeneralButton from "components/commons/Button"
import CarSummary from "./CarSummary"

const CarCard = ({
  item,
  onChange,
  onShowDetail,
  onSelect,
  selected,
  showSummary,
}) => {
  const { t } = useTranslation()
  const mediaUri = item.animation_url || item.image
  const showAcionBar = !!onChange || !!onShowDetail || !!onSelect

  return (
    <RioCard>
      {selected && <div className="SelectedCarBar">{t("car.selectedCar")}</div>}
      <div className="RioCarCardContent">
        <MediaPlayer url={mediaUri} playing />
        {showSummary && <CarSummary car={item} />}
      </div>
      {showAcionBar && (
        <div className="RioCarActions">
          {onChange && (
            <RioTextButton text={t("car.changeCar")} onClick={onChange} />
          )}
          {onShowDetail && (
            <RioTextButton text={t("car.showDetails")} onClick={onShowDetail} />
          )}
          {onSelect && (
            <GeneralButton onClick={onSelect} disabled={selected} size="small">
              {selected ? t("selected") : t("select")}
            </GeneralButton>
          )}
        </div>
      )}
    </RioCard>
  )
}

export default CarCard
