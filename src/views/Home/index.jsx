import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import DefaultLayout from "layout/DefaultLayout"

import { openModalAction } from "store/redux/modal/actions"
import { isAuthorizedSelector } from "store/redux/auth/selectors"

import carsImg from "assets/images/otr_cars.png"
import stationsImg from "assets/images/otr_stations.png"
import landsImg from "assets/images/otr_lands.png"
import technicImg from "assets/images/otr_technic.png"
import gasstations from "assets/images/gasstations.jpg"
import section2 from "assets/images/section2.jpg"
import logo from "assets/images/logo_r.png"
import Card from "components/commons/Card/TicketCard"
import RioButton from "components/commons/Button"
import RioTextButton from "components/commons/Button/TextButton"

import "./styles.scss"

function Home() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const isAuthorized = useSelector(isAuthorizedSelector)

  const onClickStart = () => {
    if (isAuthorized) {
      // TODO: do something
    } else {
      dispatch(openModalAction({ type: "authModal", step: 2 }))
    }
  }

  const onClickCard = (path) => () => {
    if (isAuthorized) {
      history.push(path)
    } else {
      dispatch(openModalAction({ type: "authModal", step: 2 }))
    }
  }

  const handleClick = () => {
    window.open("https://whitepaper.riot.fun/", "_blank")
  }

  return (
    <DefaultLayout>
      <div className="HomeHeroSection">
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
        <div className="HomeHeroText">
          <div className="HeroLogo">
            <img src={logo} alt="Riot" />
          </div>
          <h1 className="heading1">{t("home.heroTitle")}</h1>
          <h3 className="heading3">{t("home.heroText")}</h3>
          <div className="button_wrapper">
            <RioButton onClick={onClickStart} className="StartButton">
              {isAuthorized ? t("shopNow") : t("start")}
            </RioButton>
          </div>
        </div>
      </div>

      <div className="HomeContainer">
        <div className="OwnTheRace section">
          <h2 className="heading2 title">Own the race</h2>
          <div className="CardGrid">
            <Card
              image={carsImg}
              title={t("cars.title")}
              desc={t("home.carsDesc")}
              onClick={onClickCard("dashboard/garage")}
            />
            <Card
              image={stationsImg}
              title={t("stations.title")}
              desc={t("home.stationDesc")}
              onClick={onClickCard("dashboard/assets?tab=stations")}
            />
            <Card
              image={landsImg}
              title={t("raceTrack.title")}
              desc={t("home.landsDesc")}
              onClick={onClickCard("dashboard/assets?tab=land")}
            />
            <Card
              image={technicImg}
              title={t("mechanics")}
              desc={t("home.technicDesc")}
              onClick={onClickCard("dashboard/garage")}
            />
          </div>
        </div>
        <div className="Whitepaper section">
          <div className="ImageWrapper">
            <img src={gasstations} alt="" />
          </div>
          <div className="TextContent">
            <div className="heading2 title">Own part of Riot Racers</div>
            <div className="body2">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam incidunt rerum numquam, expedita quis fugit veniam
                molestias mollitia inventore aut officiis voluptatem,
                consequatur alias aliquam minima. Et culpa totam hic.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dignissimos culpa consectetur voluptatem fugiat amet eum,
                ratione animi eos possimus, commodi recusandae odio. Veritatis
                eligendi assumenda temporibus fugit molestiae, earum enim. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Porro soluta
                dolor quae corrupti dolore maiores saepe ab praesentium. Rem
                assumenda fugiat totam, velit provident vel labore possimus
                nihil facere cum?
              </p>
            </div>
            <RioTextButton text="Read the Whitepaper" onClick={handleClick} />
          </div>
        </div>
        <div className="Article section reverse">
          <div className="ImageWrapper">
            <img src={section2} alt="" />
          </div>
          <div className="TextContent">
            <div className="heading2 title">Staking and the RIOT Token</div>
            <div className="body2">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam incidunt rerum numquam, expedita quis fugit veniam
                molestias mollitia inventore aut officiis voluptatem,
                consequatur alias aliquam minima. Et culpa totam hic.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dignissimos culpa consectetur voluptatem fugiat amet eum,
                ratione animi eos possimus, commodi recusandae odio. Veritatis
                eligendi assumenda temporibus fugit molestiae, earum enim. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Porro soluta
                dolor quae corrupti dolore maiores saepe ab praesentium. Rem
                assumenda fugiat totam, velit provident vel labore possimus
                nihil facere cum?
              </p>
            </div>
            <RioTextButton text="Read the Article" onClick={handleClick} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home
