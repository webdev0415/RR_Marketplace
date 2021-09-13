import React from "react"
import { useTranslation } from "react-i18next"
import Loading from "components/commons/Loading"

import "./styles.scss"

function Loader() {
  const { t } = useTranslation()

  return (
    <div className="loader_banner">
      <div className="loading_title">{t("waitText")}</div>
      <Loading />
    </div>
  )
}

export default Loader
