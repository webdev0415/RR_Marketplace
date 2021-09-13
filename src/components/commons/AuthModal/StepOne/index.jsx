import React from "react"
import { useTranslation } from "react-i18next"

import Lock from "assets/icons/Lock.png"
import Shield from "assets/icons/Shield.png"

import "./styles.scss"

function StepOne({ setStep }) {
  const { t } = useTranslation()
  return (
    <div className="step_one_banner">
      <div className="s_one_title">
        <b>RIOT Racer</b> enables authentication using fortmatic.
      </div>
      <div className="flex s_one_terms">
        <div className="img_banner">
          <img src={Lock} alt="lock" />
        </div>
        <div>{t("phoneOrEmail")}</div>
      </div>
      <div className="flex s_one_terms">
        <div className="img_banner">
          <img src={Shield} alt="shield" />
        </div>
        <div>{t("fundSafeguarded")}</div>
      </div>

      <div className="continue_btn_banner">
        <button
          className="start_btn continue_btn"
          type="submit"
          onClick={() => setStep(2)}
        >
          {t("continue")}
        </button>
      </div>

      <div className="accepting_statement">
        By continuing you agree to Formatic's
        <span className="highlights">Terms of Services, Privacy Policy,</span>
        and <span className="highlights">Cookie Policy</span>
      </div>

      <div className="checkbox_banner">
        <label>
          <input
            type="checkbox"
            className="s_one_checkbox"
            aria-label="confirm agreement"
          />
          {t("dontShow")}
        </label>
      </div>
    </div>
  )
}

export default StepOne
