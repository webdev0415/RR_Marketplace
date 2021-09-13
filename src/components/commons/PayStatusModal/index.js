import React from "react"
import { useTranslation } from "react-i18next"
import LoadingSpinner from "components/commons/LoadingIcon"
import RioModal from "components/commons/Modal"

import "./styles.scss"

const PayStatusModal = ({ payLoading, salePriceInfo }) => {
  const { t } = useTranslation()

  return (
    <RioModal
      hideClose
      footer={null}
      closable={false}
      visible={payLoading}
      className="PayStausModal"
      title={t("paymodal.completeTrade")}
    >
      <div className="body1">
        {t("paymodal.completeTradeDesc", { salePriceInfo })}
      </div>
      <div className="SpinnerContainer">
        <LoadingSpinner size={30} />
      </div>
    </RioModal>
  )
}

export default PayStatusModal
