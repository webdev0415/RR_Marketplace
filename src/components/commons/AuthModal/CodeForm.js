import React, { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import Input from "../Input"
import Spinner from "../Spinner"
import { validateInteger } from "helper/validation"

const CodeFrom = ({ email, onResend, onClickChange, onSubmit, isLoading }) => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const timer = useRef()
  const [code, setCode] = useState()
  const [errMsg, setErrMsg] = useState("")
  const [seconds, setSeconds] = useState(30)

  const handleChangeInput = (e) => {
    const { value } = e.target
    if (!value) {
      setErrMsg("")
      setCode(value)
      return
    }
    const invalid = validateInteger(value)
    if (invalid) {
      setErrMsg(invalid)
    } else if (value.length <= 6) {
      setErrMsg("")
      setCode(value)
    }
  }

  const sendOTPAgain = () => {
    if (seconds === 0) {
      onResend()
      setCode("")
      setSeconds(30)
    }
  }

  useEffect(() => {
    if (seconds > 0) {
      timer.current = setTimeout(() => setSeconds(seconds - 1), 1000)
    } else if (seconds <= 0) {
      clearTimeout(timer.current)
    }
  }, [seconds])

  useEffect(() => {
    if (!errMsg && code?.length === 6) {
      onSubmit(code)
      setSeconds(0)
      clearTimeout(timer.current)
    }
  }, [code])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="verifyCodeModal">
      <div className="innerBlock formTitle">
        <div className="heading2">{t("enterCode")}</div>
        <div className="heading2 userEmail">{email}</div>
      </div>
      <div className="innerBlock">
        <Input
          autoFocus
          error={errMsg}
          value={code}
          disabled={isLoading}
          inputRef={inputRef}
          pattern="\d*"
          label={t("form.enterCode")}
          onChange={handleChangeInput}
        />
      </div>
      {!isLoading && (
        <div className="innerBlock">
          {seconds === 0 && (
            <>
              <span
                className="heading2 resendCode"
                role="presentation"
                onClick={sendOTPAgain}
              >
                {t("resendCode")}
              </span>
              {onClickChange && (
                <span
                  className="heading2 resendCode"
                  role="presentation"
                  onClick={onClickChange}
                >
                  {t("changeEmail")}
                </span>
              )}
            </>
          )}
          {seconds !== 0 && <span className="heading2">{seconds}</span>}
        </div>
      )}
      {isLoading && (
        <div className="innerBlock">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default CodeFrom
