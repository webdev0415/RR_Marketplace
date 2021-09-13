import React from "react"
import { Link } from "react-router-dom"
import Twitter from "assets/icons/Twitter.png"
import OpenSea from "assets/icons/opensea.png"
import MediumIcon from "assets/icons/medium.png"
import DiscordIcon from "assets/icons/discord.png"

import "./styles.scss"

function Footer() {
  return (
    <div className="footer_banner">
      <div className="bottom_footer">
        <div className="inner_footer_banner flex_row">
          <div className="flex f_items_banner mb-15 mb-md-0">
            <div className="f_item">
              <a
                href="https://whitepaper.riot.fun/"
                target="_blank"
                rel="noreferrer"
              >
                White Paper
              </a>
            </div>
            <div className="f_item">
              <Link to="/">Support</Link>
            </div>
            <div className="f_item">
              <Link to="/">Terms & Conditions</Link>
            </div>
          </div>
          <div className="flex f_social_icon_banner">
            <a
              href="https://twitter.com/RiotRacers"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="f_social_icon"
                src={Twitter}
                alt="twitter button"
              />
            </a>
            <a
              href="https://opensea.io/collection/riot-racers-cars"
              rel="noreferrer"
            >
              <img
                className="f_social_icon"
                src={OpenSea}
                alt="OpenSea button"
              />
            </a>
            <Link to="/">
              <img
                className="f_social_icon"
                src={MediumIcon}
                alt="Medium button"
              />
            </Link>
            <a href="https://discord.gg/riotracers" rel="noreferrer">
              <img
                className="f_social_icon"
                src={DiscordIcon}
                alt="Discord button"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
