import React, { useMemo } from "react"
import dayjs from "dayjs"
import RioCard from "./RioCard"
import RioTextButton from "../Button/TextButton"

const Item = ({ entity }) => {
  const createdAt = dayjs(entity.createdAt)
  const desc = useMemo(() => {
    switch (entity.logType) {
      case "registered":
        return "Registered"
      case "login":
        return "Login"
      default:
        return null
    }
  }, [entity])

  return (
    <div className="activityRow">
      <div className="activityType">
        <div className="subtitle2 description">{desc}</div>
        <div className="subtitle2 dateTime">
          {createdAt.format("MMMM DD, HH:mm a")}
        </div>
      </div>
    </div>
  )
}

const ActivitiesCard = ({ activities, onViewMore }) => {
  const showAcionBar = !!onViewMore
  return (
    <RioCard onViewMore={onViewMore}>
      <div className="UserActivities">
        <ul>
          {activities.map((item) => (
            <li key={item.id}>
              <Item entity={item} />
            </li>
          ))}
        </ul>
        {showAcionBar && (
          <div className="RioCarActions">
            <RioTextButton text="View More" onClick={onViewMore} />
          </div>
        )}
      </div>
    </RioCard>
  )
}

export default ActivitiesCard
