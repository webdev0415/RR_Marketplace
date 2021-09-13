import React, { useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DeleteFilled } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
// import LoadingSpinner from "components/commons/LoadingIcon"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { loadingSelector } from "store/redux/marketplace/selectors"
import {
  payCarAction,
  deleteCartAction,
  removeExpiredItemAction,
} from "store/redux/marketplace/actions"
import PayStatusModal from "components/commons/PayStatusModal"
import RioModal from "components/commons/Modal"
import { formatNum } from "helper/number"

import RioCard from "./RioCard"
import MediaPlayer from "../Media"
import RioTextButton from "../Button/TextButton"
import GeneralButton from "../Button"
import CartTimer from "./CartTimer"

const CartCard = ({
  playing = false,
  item,
  onChange,
  onShowDetail,
  onSelect,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isAuthorized = useSelector(isAuthorizedSelector)
  const { payLoading } = useSelector(loadingSelector)
  const [expired, setExpired] = useState(false)

  const mediaUri = item.animation_url || item.image
  const showAcionBar = !!onChange || !!onShowDetail || !!onSelect
  const saleStatus = item?.saleStatus

  const handlePayClick = () => {
    dispatch(payCarAction({ item }))
  }

  const handleDeleteCardClick = () => {
    const { id } = item
    const { assetType } = item.transaction

    RioModal.confirm({
      icon: null,
      maskClosable: true,
      centered: true,
      title: t("cart.removeItemTile"),
      okButtonProps: {
        className: "RioButton primary",
      },
      cancelButtonProps: {
        type: "text",
        className: "RioButton",
      },
      okText: t("remove"),
      cancelText: t("cancel"),
      content: t("cart.removeItem"),
      onOk: () => {
        dispatch(deleteCartAction({ id, assetType }))
      },
    })
  }

  const handleExpiredItem = () => {
    setExpired(true)

    setTimeout(() => {
      // remove expired item after 3 sec
      // so if the user is in cart page
      // he can know it's exprired to buy
      const { id } = item
      const { assetType } = item.transaction
      dispatch(removeExpiredItemAction({ id, assetType }))
    }, 3000)
  }

  const salePriceInfo = useMemo(() => {
    if (!item?.transaction) {
      return null
    }
    const price = formatNum(item.transaction?.salePrice, null)
    const currency = item.transaction?.saleCurrency || ""

    return `${price} ${currency}`
  }, [item?.transaction])

  return (
    <RioCard>
      <div className={expired ? "SelectedCarBar expired" : "SelectedCarBar"}>
        <CartTimer
          saleStatus={item?.saleStatus}
          onTimeout={handleExpiredItem}
          saleStartTimeStamp={item?.transaction?.saleStartTimeStamp}
        />
      </div>
      <div className="RioCarCardContent">
        <MediaPlayer url={mediaUri} playing={playing} />
      </div>
      {showAcionBar && (
        <div className="RioCartbottom">
          {onChange && <RioTextButton text="Change Car" onClick={onChange} />}
          <div className="BottomDesc">
            <div className="carName" onClick={onShowDetail}>
              <div className="classSection">
                {item.transaction?.assetType === "car" &&
                  `${t("car.class")}: ${item.classFactory}`}
              </div>
              <div className="modelSection">
                #{item.id} {item.name}
              </div>
            </div>
            <div className="priceWrapper">
              <div className="priceLabel">{t("price")}</div>
              <div className="priceValue">{salePriceInfo}</div>
            </div>
          </div>
          <div className="buyBtnWrapper">
            {saleStatus === 2 && (
              <div className="cartCardButtonGroup">
                <GeneralButton
                  block
                  size="small"
                  onClick={handleDeleteCardClick}
                  disabled={!isAuthorized || expired}
                >
                  <DeleteFilled />
                </GeneralButton>
                <GeneralButton
                  block
                  size="small"
                  onClick={handlePayClick}
                  disabled={!isAuthorized || expired || payLoading}
                >
                  {t("payNow")}
                </GeneralButton>
              </div>
            )}
          </div>
        </div>
      )}
      <PayStatusModal payLoading={payLoading} salePriceInfo={salePriceInfo} />
    </RioCard>
  )
}

export default CartCard
