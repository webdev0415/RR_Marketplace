import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { getStationsAction } from "store/redux/assets/actions"
import { openModalAction } from "store/redux/modal/actions"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { useHistory } from "react-router-dom"
import Card from "components/commons/Card/TicketCard"
import carsImg from "assets/images/otr_cars.png"
import stationsImg from "assets/images/otr_stations.png"
import landsImg from "assets/images/otr_lands.png"
import "./styles.scss"

const Marketplace = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getStationsAction())
  }, [])
  const { t } = useTranslation()
  const isAuthorized = useSelector(isAuthorizedSelector)
  const onClickCard = (path) => {
    if (isAuthorized) {
      history.push(path)
    } else {
      dispatch(openModalAction({ type: "authModal", step: 2 }))
    }
  }
  return (
    <div>
      <div>
        <div className="marketplace-wrapper">
          <video muted autoPlay loop playsInline className="rio-videCols-media">
            <source
              src="https://riot.fun/images/raw-video.mp4"
              type="video/mp4"
            />
            <source
              src="https://riot.fun/images/raw-video.ogg"
              type="video/ogg"
            />
          </video>
        </div>
      </div>
      <div className="OwnTheRace">
        <div className="CardGrid">
          <Card
            image={carsImg}
            title={t("cars.title")}
            desc={t("home.carsDesc")}
            onClick={() => onClickCard("cars")}
          />
          <Card
            image={stationsImg}
            title={t("stations.title")}
            desc={t("home.stationDesc")}
            onClick={() => onClickCard("gasstation")}
          />
          <Card
            image={landsImg}
            title={t("raceTrack.title")}
            desc={t("home.landsDesc")}
            onClick={() => onClickCard("racetrack-land")}
          />
        </div>
      </div>
    </div>
  )
}

export default Marketplace
