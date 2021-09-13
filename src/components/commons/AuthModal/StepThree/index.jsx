import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

import { authStateSelector } from "store/redux/auth/selectors"
import { closeModalAction } from "store/redux/modal/actions"
import Button from "components/commons/Button"

import "./styles.scss"

function StepThree({ setStep }) {
  const authState = useSelector(authStateSelector)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleClick = () => {
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
      "_blank"
    )
    if (!authState.isLoggedIn) {
      setStep(2)
    } else {
      dispatch(closeModalAction())
    }
  }

  return (
    <div className="stepThreeBanner">
      <div className="heading2">{t("askMetaMask")}</div>
      <div className="body1">{t("notFoundMetaMask")}</div>
      <Button onClick={handleClick}>{t("installMetaMask")}</Button>
    </div>
  )
}

export default StepThree
