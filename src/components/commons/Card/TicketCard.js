import React from "react"
import { useTranslation } from "react-i18next"
import RioCard from "components/commons/Card/RioCard"
import RioTextButton from "components/commons/Button/TextButton"

import "./styles.scss"

function Card({ image, title, desc, onClick }) {
  const { t } = useTranslation()
  return (
    <RioCard className="HomeCard">
      <img src={image} alt={title} />
      <div className="CardRight">
        <h4 className="heading2">{title}</h4>
        <p className="body2">{desc}</p>
        <RioTextButton text={t("explore")} onClick={onClick} />
      </div>
    </RioCard>
  )
}

export default Card
