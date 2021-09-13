import React, { useMemo } from "react"
import { isEmpty } from "lodash"
import { useTranslation } from "react-i18next"
import { formatNum } from "helper/number"

import RioCard from "./RioCard"
import MediaPlayer from "../Media"
import RioTextButton from "../Button/TextButton"
import AddToCart from "../AddToCart"

const CarCard = ({
  playing = false,
  item,
  onChange,
  onShowDetail,
  onSelect,
}) => {
  const { t, i18n } = useTranslation()

  const mediaUri = item.animation_url || item.image
  const showAcionBar = !!onChange || !!onShowDetail || !!onSelect

  const carPrice = useMemo(() => {
    if (!item?.transaction) {
      return null
    }

    const price = formatNum(item.transaction?.salePrice, null)
    const currency = item.transaction?.saleCurrency || ""

    return (
      <>
        <div className="priceLabel">{t("price")}</div>
        <div className="priceValue">{`${price} ${currency}`}</div>
      </>
    )
  }, [item?.transaction, i18n.language])

  return (
    <RioCard>
      <div className="RioCarCardContent">
        <MediaPlayer url={mediaUri} playing={playing} />
      </div>
      {showAcionBar && (
        <div className="RioCarBottom">
          {onChange && <RioTextButton text="Change Car" onClick={onChange} />}
          <div onClick={onShowDetail} className="BottomDesc">
            <div className="carName">
              <div className="classSection">
                {t("car.class")}: {item.classFactory}
              </div>
              <div className="modelSection">
                #{item.id} {item.name}
              </div>
            </div>
            <div className="priceWrapper">{carPrice}</div>
          </div>
          {!isEmpty(item?.transaction) && (
            <div className="buyBtnWrapper">
              <AddToCart item={item} />
            </div>
          )}
        </div>
      )}
    </RioCard>
  )
}

export default CarCard
