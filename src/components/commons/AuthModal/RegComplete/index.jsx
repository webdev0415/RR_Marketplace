import React from "react"
import { useTranslation } from "react-i18next"

import "./styles.scss"

function RegistrationComplete({ setStep }) {
  const { t } = useTranslation()
  return (
    <div className="registration_complete_banner">
      <div className="rg_compl_title">{t("registrationComplete")}</div>
      <div className="rg_compl_sub_title">
        {t("welcome")} <b>Bryan Smith</b>
      </div>
      <div className="final_steps_msg">{t("finalStepText")}</div>
      <div className="continue_btn_banner">
        <button
          className="start_btn continue_btn"
          type="submit"
          onClick={() => setStep(6)}
        >
          {t("okText")}
        </button>
      </div>
    </div>
  )
}

export default RegistrationComplete
