import React from "react"
import useWindowDimensions from "hooks/useWindowDimensions"
import { useTranslation } from "react-i18next"
import RioModal from "components/commons/Modal"
import { MEDIUM_MOBILE } from "constants/breakPoints"
import ReCAPTCHA from "react-google-recaptcha"
import { RECAPTCHA_SITE_KEY } from "constants/apiConfig"
import noRobots from "assets/images/no-robots.png"
import Button from "components/commons/Button"
import "./styles.scss"

const RecaptchaModal = ({
  buyLoading,
  continueStatus,
  recaptchaModalShowable,
  setRecaptchaModalShowable,
  handleLoginReCAPTCHAChange,
  handleContinueToBuyClick,
  handleCloseModal,
}) => {
  const { width: windowWidth } = useWindowDimensions()
  const { t } = useTranslation()
  const isFullModal = windowWidth <= MEDIUM_MOBILE

  return (
    <RioModal
      onCancel={handleCloseModal}
      width="450px"
      height="400px"
      className="recaptcha_modal"
      isFull={isFullModal}
      visible={recaptchaModalShowable}
    >
      <div className="no_robot_image">
        <img src={noRobots} alt="No Robot" width={200} height={200} />
      </div>
      {!continueStatus && (
        <div className="captcha_wrapper">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleLoginReCAPTCHAChange}
          />
        </div>
      )}
      {continueStatus && (
        <Button className="continue_btn" onClick={handleContinueToBuyClick}>
          {t("contineToBuy")}
        </Button>
      )}
    </RioModal>
  )
}

export default RecaptchaModal
