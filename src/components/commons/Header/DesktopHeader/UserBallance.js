import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import useMetaMaskAuth from "hooks/useMetaMaskAuth"
import { getBalanceSelector } from "store/redux/coin/selectors"
import { authStateSelector } from "store/redux/auth/selectors"
import { getBalanceAction } from "store/redux/coin/actions"
import { getGasBalanceSelector } from "store/redux/property/selectors"
import IconWallet from "../../Icons/IconWallet"
import IconFuel from "../../Icons/IconFuel"

const UserBallance = () => {
  const dispatch = useDispatch()
  const balances = useSelector(getBalanceSelector)
  const { isMetaMaskLoggedIn } = useSelector(authStateSelector)
  const { getBalance } = useMetaMaskAuth()
  const gasBalance = useSelector(getGasBalanceSelector)
  const { t } = useTranslation()

  const getValue = (value = 0) => {
    const balanceNum = parseFloat(value, 10)
    return balanceNum.toFixed(3)
  }

  useEffect(() => {
    if (isMetaMaskLoggedIn) getBalance()
    else {
      dispatch(getBalanceAction())
    }
  }, [isMetaMaskLoggedIn])

  return (
    <div className="UserBallaceContainer">
      <div className="UserBallance">
        <div>
          <div>{t("gas")}:</div>
          <div className="value">
            {gasBalance || 0} {t("gallons")}
          </div>
        </div>
        <div>
          <IconFuel />
        </div>
      </div>

      <div className="UserBallance">
        <div>
          <div>
            <span>{t("eth")}:</span>
            <span className="value">{getValue(balances?.mainnet?.eth)}</span>
          </div>
          <div>
            <span>{t("riot")}:</span>
            <span className="value">{getValue(balances?.mainnet?.riot)}</span>
          </div>
        </div>
        <div>
          <IconWallet />
        </div>
      </div>
    </div>
  )
}

export default UserBallance
