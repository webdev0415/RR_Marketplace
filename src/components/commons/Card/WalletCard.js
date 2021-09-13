import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import useMetaMaskAuth from "hooks/useMetaMaskAuth"
import { coinStateSelector } from "store/redux/coin/selectors"
import { authStateSelector } from "store/redux/auth/selectors"
import { getBalanceAction } from "store/redux/coin/actions"
import RioCard from "./RioCard"
import RioTextButton from "../Button/TextButton"

import "./styles.scss"

const WalletCard = ({ onClick }) => {
  const dispatch = useDispatch()
  const { balances } = useSelector(coinStateSelector)
  const { isMetaMaskLoggedIn } = useSelector(authStateSelector)
  const { getBalance } = useMetaMaskAuth()
  const { t } = useTranslation()

  useEffect(() => {
    if (!balances) {
      if (isMetaMaskLoggedIn) getBalance()
      else {
        dispatch(getBalanceAction())
      }
    }
  }, [isMetaMaskLoggedIn])

  const getValue = (value = 0) => {
    const balanceNum = parseFloat(value, 10)
    return balanceNum.toFixed(3)
  }
  const showAcionBar = !!onClick

  return (
    <RioCard>
      <div className="BalanceRow">
        <div className="BalanceCol">
          <span className="subtitle1 value">{getValue(balances?.mainnet)}</span>
          <span className="subtitle2 label">{t("eth")}</span>
        </div>
        <div className="BalanceCol">
          <span className="subtitle1 value">{getValue(balances?.mainnet)}</span>
          <span className="subtitle2 label">{t("weth")}</span>
        </div>
        <div className="BalanceCol">
          <span className="subtitle1 value">{getValue(balances?.matic)}</span>
          <span className="subtitle2 label">{t("riot")}</span>
        </div>
      </div>
      {showAcionBar && (
        <div className="RioCarActions">
          <RioTextButton text="Check your wallet" onClick={onClick} />
        </div>
      )}
    </RioCard>
  )
}

export default WalletCard
