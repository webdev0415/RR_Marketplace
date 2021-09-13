import React from "react"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import { useTranslation } from "react-i18next"
import RioCard from "components/commons/Card/RioCard"
import ComingSoon from "components/ComingSoon"

const Item = ({ entity }) => {
  const { t } = useTranslation()
  const createdAt = dayjs(entity.createdAt)

  return (
    <div className="historyRow">
      <div>
        <span className="subtitle2 user sender">{entity.from}</span>
        <span className="subtitle2 actionType">{t("transaction.soldTo")}</span>
        <span className="subtitle2 user buyer">{entity.to}</span>
      </div>
      <div className="secondLine">
        <span className="subtitle2 dateTime">
          {createdAt.format("MMMM DD, HH:mm a")}
        </span>
        <span className="ethValue">{entity.price}</span>
      </div>
    </div>
  )
}

const SalesHistories = ({ histories }) => (
  <RioCard>
    <div className="SalesHistory">
      {!isEmpty(histories) && (
        <ul>
          {histories.map((item, key) => (
            <li key={key}>
              <Item entity={item} />
            </li>
          ))}
        </ul>
      )}
      <ComingSoon />
    </div>
  </RioCard>
)

export default SalesHistories
