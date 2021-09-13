import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import RioCard from "./RioCard"
import MediaPlayer from "../Media"
import RioTextButton from "../Button/TextButton"
import { formatNum } from "helper/number"
import AddToCart from "../AddToCart"

const StationCard = ({ item, onChange, onShowDetail }) => {
  const mediaUri = item.animation_url || item.image
  const { t, i18n } = useTranslation()

  const itemPrice = useMemo(() => {
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
      <MediaPlayer url={mediaUri} preview={false} />
      <div
        className={
          onShowDetail ? "RioStationBottom" : "RioStationBottom disabled"
        }
      >
        {onChange && <RioTextButton text="Change Car" onClick={onChange} />}
        <div className="BottomDesc" onClick={onShowDetail}>
          <div className="carName">
            <div className="carLabel">{t("car.name")}</div>
            <div className="modelSection">
              #{item.id} {item.name}
            </div>
          </div>
          <div className="priceWrapper">{itemPrice}</div>
        </div>
        {!isEmpty(item?.transaction) && (
          <div className="buyBtnWrapper">
            <AddToCart item={item} />
          </div>
        )}
      </div>
    </RioCard>
  )
}

export default StationCard
