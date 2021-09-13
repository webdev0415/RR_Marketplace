import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import { timeToCompletePaymentSelector } from "store/redux/settings/selectors"

const CartTimer = ({ saleStatus, saleStartTimeStamp, onTimeout }) => {
  const { t } = useTranslation()
  const timer = useRef()
  const remainingSec = useRef()
  const [timeToRender, setTimeToRender] = useState(null)

  const timeToCompletePayment = useSelector(timeToCompletePaymentSelector)

  function convertHMS() {
    if (timeToRender) {
      const sec = parseInt(timeToRender, 10)
      let hours = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - hours * 3600) / 60)
      let seconds = sec - hours * 3600 - minutes * 60
      if (hours < 10 && hours > 0) {
        hours = `0${hours}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      if (!hours) {
        return `${minutes}:${seconds} mins`
      }
      return `${hours}:${minutes}:${seconds}`
    }
  }

  const pickText = () => {
    if (!timeToRender && saleStatus === 2) {
      return t("cart.expiredTime")
    }
    switch (saleStatus) {
      case 2:
        return (
          <>
            {t("cart.payment_complete")}
            <span className="remainTimValue">{convertHMS()}</span>
          </>
        )
      case 3:
        return t("cart.transferPending")
      case 4:
        return t("cart.paymentPending")
      default:
        break
    }
  }

  const getProgressValue = () => {
    if (timeToRender) {
      return parseFloat(
        100 - (Math.max(timeToRender, 0) / timeToCompletePayment) * 100
      )
    }
  }

  useEffect(() => {
    if (saleStatus > 2) {
      clearInterval(timer.current)
      setTimeToRender(remainingSec.current)
    }
  }, [saleStatus])

  useEffect(() => {
    if (saleStartTimeStamp) {
      const currentDate = dayjs()
      const startDate = dayjs(saleStartTimeStamp)
      const remains = currentDate.diff(startDate, "seconds")
      const remainingTime = timeToCompletePayment - remains
      if (remainingTime > 0 && saleStatus === 2) {
        clearInterval(timer.current)

        remainingSec.current = remainingTime
        setTimeToRender(remainingTime)

        timer.current = setInterval(() => {
          if (remainingSec.current > 0) {
            remainingSec.current -= 1
            setTimeToRender(remainingSec.current)
          } else {
            onTimeout()
            setTimeToRender(null)
            clearInterval(timer.current)
          }
        }, 1000)
      } else {
        setTimeToRender(null)
        onTimeout()
      }
    } else if (saleStatus === 2) {
      onTimeout()
    }
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  return (
    <>
      {pickText()}
      <span
        className="progressBar"
        style={{ width: `${getProgressValue()}%` }}
      />
    </>
  )
}

export default CartTimer
