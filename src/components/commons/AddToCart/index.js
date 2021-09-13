import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Tooltip } from "antd"
import ReCAPTCHA from "react-google-recaptcha"

import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { currentDropNumberSelector } from "store/redux/settings/selectors"
import {
  isAddingToCartSelector,
  isItemInCartSelector,
} from "store/redux/marketplace/selectors"
import { addItemToCartAction } from "store/redux/marketplace/actions"

import LoadingSpinner from "components/commons/LoadingIcon"
import RioModal from "components/commons/Modal"
import IconCart from "components/commons/Icons/IconCart"

import { RECAPTCHA_SITE_KEY } from "constants/apiConfig"
import noRobots from "assets/images/no-robots.png"

import GeneralButton from "../Button"

import "./styles.scss"

const AddToCart = ({ item, iconButton }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuthorized = useSelector(isAuthorizedSelector)
  const currentDropNumber = useSelector(currentDropNumberSelector)
  const addingToCart = useSelector(isAddingToCartSelector)

  const [isShowRecaptcha, setIsShowRecaptcha] = useState(false)
  const [captchaKey, setCaptchaKey] = useState()

  const itemIsInCart = useSelector((state) => {
    const idAndType = `${item?.id}-${item?.transaction?.assetType}`
    return isItemInCartSelector(state, idAndType)
  })

  const onClickHandler = (e) => {
    e.stopPropagation()
    setIsShowRecaptcha(true)
  }

  const closeRecaptcha = () => {
    setIsShowRecaptcha(false)
    setCaptchaKey(null)
  }

  const handleLoginReCAPTCHAChange = (value) => {
    setCaptchaKey(value)
  }

  const handleContinueToBuyClick = () => {
    dispatch(
      addItemToCartAction({
        itemId: item.id,
        assetType: item.transaction.assetType,
        captcha: captchaKey,
      })
    )
    closeRecaptcha()
  }

  if (!item?.transaction) {
    return null
  }

  const disabled =
    !isAuthorized ||
    itemIsInCart ||
    item.saleStatus !== 1 ||
    !item.transaction?.salePrice ||
    currentDropNumber !== item.dropNumber

  if (disabled) {
    let helperTitle = ""
    if (!isAuthorized) {
      helperTitle = t("helperText.shouldLoginToBuy")
    } else if (itemIsInCart) {
      helperTitle = t("helperText.alreadyInCart")
    } else if (currentDropNumber !== item.dropNumber) {
      helperTitle = "Not matching to the current drop"
    } else if (item.saleStatus === 2) {
      helperTitle = t("helperText.assetsHoldOn")
    } else if (item.saleStatus === 3) {
      helperTitle = t("helperText.paymentReceived")
    } else {
      // if (item.saleStatus === 4)
      helperTitle = t("helperText.notAvailableToPurshase")
    }
    return (
      <Tooltip title={helperTitle}>
        <span className="DisabledTooltipWrapper">
          <GeneralButton disabled size="small" block iconButton={iconButton}>
            {iconButton ? <IconCart /> : t("addToCart")}
          </GeneralButton>
        </span>
      </Tooltip>
    )
  }

  const isAddingToCart = addingToCart && addingToCart[item.id]

  return (
    <>
      <GeneralButton
        block
        size="small"
        disabled={isAddingToCart}
        onClick={onClickHandler}
        iconButton={iconButton}
      >
        {isAddingToCart ? (
          <LoadingSpinner size={25} />
        ) : iconButton ? (
          <IconCart />
        ) : (
          t("addToCart")
        )}
      </GeneralButton>
      {isShowRecaptcha && (
        <RioModal
          visible
          width="450px"
          height="400px"
          className="recaptcha_modal"
          onCancel={closeRecaptcha}
        >
          <div className="no_robot_image">
            <img src={noRobots} alt="No Robot" width={200} height={200} />
          </div>
          {!captchaKey && (
            <div className="captcha_wrapper">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleLoginReCAPTCHAChange}
              />
            </div>
          )}
          {captchaKey && (
            <GeneralButton
              className="continue_btn"
              onClick={handleContinueToBuyClick}
            >
              {t("contineToBuy")}
            </GeneralButton>
          )}
        </RioModal>
      )}
    </>
  )
}

export default AddToCart
