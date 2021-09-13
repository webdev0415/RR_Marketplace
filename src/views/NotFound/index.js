import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import DefaultLayout from "layout/DefaultLayout"
import RioButton from "components/commons/Button"

import "./styles.scss"

const NotFoundPage = () => {
  const { t } = useTranslation()
  const history = useHistory()

  useEffect(() => {
    if (history?.location?.pathname === "/") {
      history.push("/dashboard/cars")
    }
  }, [history])

  return (
    <DefaultLayout className="NotFoundPage">
      <h3 className="heading1">{t("notFound.title")}</h3>
      <Link to="/dashboard/cars">
        <RioButton>{t("notFound.backBtn")}</RioButton>
      </Link>
    </DefaultLayout>
  )
}

export default NotFoundPage
