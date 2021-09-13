import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import notify from "components/commons/notification"
import ReCAPTCHA from "react-google-recaptcha"
import { sendOTPAction } from "store/redux/auth/actions"
import { authStateSelector } from "store/redux/auth/selectors"
import useMetaMaskAuth from "hooks/useMetaMaskAuth"
import { RECAPTCHA_SITE_KEY } from "constants/apiConfig"
import { checkUsernameApi, checkEmailApi } from "api/users"
import { validateEmail, validateUsername } from "helper/validation"
import Button from "../../Button"
import Input from "../../Input"
import Spinner from "../../Spinner"

import metamask from "assets/images/metamask.png"

import "./styles.scss"

const validate = (value, name) => {
  let msg = null
  if (name === "username") {
    msg = validateUsername(value)
  }
  if (name === "email") {
    msg = validateEmail(value)
  }
  return msg
}

function StepTwo({ setStep }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [username, setUsername] = useState("")
  const [usernameErr, setUsernameErr] = useState("")
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [loginReCaptchaSuccess, setLoginReCaptchaSuccess] = useState(false)
  const { isMetaMaskLoggedIn, isLoggedIn, user } =
    useSelector(authStateSelector)
  const { handleAuth, publicAddress } = useMetaMaskAuth(onMetaMaskNotInstalled)

  function onMetaMaskNotInstalled() {
    setStep(3)
  }

  const onSuccess = () => {
    setIsSent(false)
    notify({ type: "info", title: t("codeSent") })
    setStep(4)
  }

  const onError = (message) => {
    setIsSent(false)
    notify({ title: message })
  }

  const handleSubmit = async () => {
    setIsSent(true)
    const usernameInvalid = validate(username, "username")
    if (usernameInvalid) {
      setUsernameErr(usernameInvalid)
      setIsSent(false)
      return
    }
    let isExist = false
    try {
      await checkUsernameApi(username)
    } catch (error) {
      isExist = true
      setUsernameErr(t("usernameExist"))
    }
    try {
      await checkEmailApi(email)
    } catch (error) {
      isExist = true
      setEmailErr(t("emailExit"))
    }
    if (isExist) {
      setIsSent(false)
      return
    }

    dispatch(
      sendOTPAction({ email, username, publicAddress, onSuccess, onError })
    )
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  const disableBtn = useMemo(
    () => !!validateEmail(email) || !username,
    [email, username]
  )

  const handleLoginReCAPTCHAChange = () => {
    setLoginReCaptchaSuccess(true)
  }

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
    if (user?.username) {
      setUsername(user.username)
    }
  }, [user])

  return (
    <div className="stepTwoBanner">
      {!isMetaMaskLoggedIn && (
        <>
          <div className="heading2 stepTwoTitle">{t("toContinue")}</div>
          <div className="innerWrapper">
            <div className="metamaskImg">
              <img
                src={metamask}
                alt="Connect Meta Mask"
                className="connectMateMaster"
              />
            </div>
            <div>
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleLoginReCAPTCHAChange}
              />
            </div>
            <Button
              onClick={handleAuth}
              onKeyDown={handleAuth}
              disabled={!loginReCaptchaSuccess}
              className="loginWithMetaMask"
            >
              {t("loginWithMetaMask")}
            </Button>

            <div className="body1 metamaskDesc">
              {t("loginWithMetaMaskDesc")}
            </div>
          </div>
        </>
      )}

      {isMetaMaskLoggedIn && !isLoggedIn && (
        <>
          <div className="heading2 enterEmail">{t("enterEmail")}</div>
          <div className="innerWrapper">
            <Input
              value={username}
              label={t("username")}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              onFocus={() => {
                setUsernameErr("")
              }}
              error={usernameErr}
              disabled={isSent}
            />
            <Input
              type="email"
              value={email}
              label={t("email")}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              error={emailErr}
              onFocus={() => {
                setEmailErr("")
              }}
              disabled={isSent}
              onKeyDown={onKeyDown}
            />

            <div className="continue">
              {isSent && <Spinner />}
              {!isSent && (
                <Button onClick={handleSubmit} disabled={disableBtn}>
                  {t("continue")}
                </Button>
              )}
            </div>
            <div />
          </div>
        </>
      )}
    </div>
  )
}

export default StepTwo
