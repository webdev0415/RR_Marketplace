import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Tooltip } from "antd"
import useMetaMaskAuth from "hooks/useMetaMaskAuth"
import { coinStateSelector } from "store/redux/coin/selectors"
import { authStateSelector } from "store/redux/auth/selectors"
import { getBalanceAction } from "store/redux/coin/actions"
import IconWallet from "../Icons/IconWallet"

import "./styles.scss"

function BallanceWidget({ type = "normalWidgget", ...rest }) {
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

  switch (type) {
    case "navItem": {
      return (
        <div className="balance-widget">
          <div className="right">
            <div>
              <span>{t("eth")}:</span>
              {getValue(balances?.mainnet)}
            </div>
            <div>
              <span>{t("riot")}:</span>
              {getValue(balances?.matic)}
            </div>
          </div>
          <IconWallet
            className="icon"
            onClick={() => {
              getBalance()
            }}
          />
        </div>
      )
    }
    case "normalWidgget": {
      return (
        <>
          <div className="rio-heading">{t("wallet")}</div>
          <div className="rio-detailCols mb-20">
            <table>
              <thead>
                <tr>
                  <th>{t("ethereum")}</th>
                  <th>{t("matic")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{t("eth")} :</span>
                    {getValue(balances?.mainnet)}
                  </td>
                  <td>
                    {t("weth")} : {getValue(balances?.mainnet)}
                  </td>
                </tr>
                <tr>
                  <td>
                    {t("riot")} : {getValue(balances?.matic)}
                  </td>
                  <td>
                    {t("riot")} : {getValue(balances?.matic)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    }
    case "widgetBox": {
      return (
        <div className="wallet">
          <div className="wallet_title">{t("ethereumChain")}</div>
          <div className="wallet_retangle">
            <div className="item_bar">
              <div>
                <span>{t("eth")}:</span>
                {getValue(balances?.mainnet)}{" "}
              </div>
              <a className="button button_bar" href={rest.link} target="blank">
                {t("swapMatic")}
              </a>
            </div>
            <div className="item_bar">
              <div>
                <span>{t("riot")}:</span>
                {getValue(balances?.matic)}
              </div>
              <Tooltip title="Coming Soon">
                <div className="button button_bar disabled">{t("buyRiot")}</div>
              </Tooltip>
            </div>
          </div>
        </div>
      )
    }
    default:
      return (
        <div className="wallet">
          <div className="wallet_title">{rest?.title}</div>
          <div className="wallet_retangle">
            <div className="item_bar">
              <div>
                <span>{t("weth")}:</span>
                {getValue(balances?.mainnet)}
              </div>
              <a className="button button_bar" href={rest.link} target="blank">
                {type === "swapMaticWidget" ? t("swapMatic") : t("sawpETH")}
              </a>
            </div>
            <div className="item_bar">
              <div>
                <span>{t("riot")}:</span>
                {getValue(balances?.matic)}
              </div>
              <Tooltip title="Coming Soon">
                <div className="button button_bar disabled">
                  {type === "swapMaticWidget" ? t("buyRiot") : t("addRiot")}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      )
  }
}

export default BallanceWidget
