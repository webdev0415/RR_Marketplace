import React, { useMemo } from "react"
import { Modal as AntModal, Button } from "antd"
import { useTranslation } from "react-i18next"
import Spinner from "components/commons/Spinner"
import "./styles.scss"

const ConfirmModal = ({ visible, handleDeleteCardClick, setConfirming }) => {
  const { t } = useTranslation()
  return (
    <AntModal
      className="confirm-modal"
      centered
      footer={null}
      visible={visible}
      closable={false}
    >
      <div className="pay-modal-header">{t("cart.removeItem")}</div>
      <div className="buttonWrapper">
        <Button onClick={handleDeleteCardClick}>{t("okText")}</Button>
        <Button onClick={() => setConfirming(false)}>{t("cancel")}</Button>
      </div>
    </AntModal>
  )
}

export default ConfirmModal
