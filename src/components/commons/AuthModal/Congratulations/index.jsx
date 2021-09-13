import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Button from "../../Button"
import PortalConfetti from "../../PortalConfetti"
import logo from "assets/images/logo_r.png"

import "./styles.scss"

function CongratulationsRegistraion({ closeModal }) {
  const { t } = useTranslation()
  const history = useHistory()
  const [showConf, setShowConf] = useState(true)
  const [removeConf, setRemoveConf] = useState(false)

  const onClickHanlder = () => {
    closeModal(true)
    history.push("/dashboard/cars")
  }

  const handleCompleteConf = () => {
    setRemoveConf(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowConf(false)
    }, 3000)
  }, [])

  return (
    <div className="congratulationsModal">
      <div className="logoWrapper">
        <img src={logo} alt="logo" />
      </div>
      <div className="heading">{t("congratulations")}</div>
      <div className="heading2 subTitle show">{t("youAllSet")}</div>
      <Button onClick={onClickHanlder} className="letStart show">
        {t("letStart")}
      </Button>
      {!removeConf && (
        <PortalConfetti recycle={showConf} onComplete={handleCompleteConf} />
      )}
    </div>
  )
}

export default CongratulationsRegistraion
