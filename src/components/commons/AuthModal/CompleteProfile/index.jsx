import React from "react"
import { useTranslation } from "react-i18next"
import CheckBox from "../../Checkbox"

import "./styles.scss"

function CompleteProfile({ setLoading }) {
  const { t } = useTranslation()

  return (
    <div className="complete_profile_banner">
      <div className="complete_profile_title">{t("completeProfile")}</div>
      <div className="complete_profile_sub_title">{t("compProfileDesc")}</div>
      <div className="your_wallet">{t("yourWallet")}</div>
      <div className="wallet_number">0x66aaER$474578hjGJJ85555G5j55DGGGa8</div>
      <div className="email_label">{t("email")}</div>
      <input
        value="bryan.smith@gmail.com"
        className="email_input"
        aria-label="user email"
        disabled
      />
      <div className="nickname_label">{t("nickname")}</div>
      <input
        placeholder="Nickname"
        className="nickname_input"
        aria-label="user nick name"
      />

      <CheckBox label={t("confirmAge")} />

      <CheckBox label={t("agreeNews")} />

      <div className="flex_row btn_banner">
        <button className="start_btn button" type="submit">
          {t("cancel")}
        </button>
        <button
          className="start_btn button"
          type="submit"
          onClick={() => setLoading(true)}
        >
          {t("submit")}
        </button>
      </div>
    </div>
  )
}

export default CompleteProfile
