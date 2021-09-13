import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import notify from "components/commons/notification"
import {
  sendOTPAction,
  verifyOTPAction,
  loginUserAction,
} from "store/redux/auth/actions"
import { authStateSelector } from "store/redux/auth/selectors"
import CodeFrom from "../CodeForm"

import "./styles.scss"

function CodeModal({ setStep }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authState = useSelector(authStateSelector)
  const [isLoading, setIsLoading] = useState(false)

  const publicAddress = authState.isMetaMaskLoggedIn
    ? window?.ethereum?.selectedAddress
    : null

  const onSuccess = () => {
    dispatch(
      loginUserAction({
        publicAddress,
        username: authState.user.username,
        email: authState.user.email,
      })
    )
  }

  const onError = () => {
    setIsLoading(false)
    notify({
      title: t("wrongCode"),
    })
  }

  const sendOTPAgain = () => {
    setIsLoading(true)
    const action = sendOTPAction({
      publicAddress,
      email: authState.user.email,
      username: authState.user.username,
      onSuccess: sendOTPAgainOnSuccess,
      onError: sendOTPAgainOnError,
    })
    dispatch(action)
  }

  const sendOTPAgainOnSuccess = () => {
    setIsLoading(false)
    notify({
      type: "info",
      title: t("codeSent"),
    })
  }

  const sendOTPAgainOnError = () => {
    setIsLoading(false)
    notify({
      title: t("errText"),
    })
  }

  const verifyEmail = (code) => {
    setIsLoading(true)
    dispatch(
      verifyOTPAction({
        code,
        onError,
        onSuccess,
        email: authState.user.email,
      })
    )
  }

  useEffect(() => {
    if (authState.isLoggedIn) {
      setIsLoading(false)
      notify({
        type: "info",
        title: t("emailVerified"),
      })
      setStep(7)
    }
  }, [authState.isLoggedIn])

  return (
    <CodeFrom
      email={authState.user.email}
      onResend={sendOTPAgain}
      onSubmit={verifyEmail}
      onClickChange={() => setStep(2)}
      isLoading={isLoading}
    />
  )
}

export default CodeModal
