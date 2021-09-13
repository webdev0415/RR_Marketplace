import React, { useMemo } from "react"
import { Tabs } from "antd"
import { useTranslation } from "react-i18next"
import IconLevel from "components/commons/Icons/IconLevel"
import IconStatus from "components/commons/Icons/IconStatus"
import IconInfo from "components/commons/Icons/IconInfo"
import ProgressBar from "components/commons/ProgressBar"
import "./CarSummary.scss"

const { TabPane } = Tabs

const CarInfoItem = ({ title, value }) => (
  <div className="CarInfoItem">
    <div className="subtitle2">{title}</div>
    <div className="subject">{value || " "} </div>
  </div>
)

const TabTitle = ({ title, iconName }) => {
  const icon = useMemo(() => {
    switch (iconName) {
      case "level":
        return <IconLevel />
      case "status":
        return <IconStatus />
      case "details":
        return <IconInfo />
      default:
        return () => null
    }
  }, [iconName])
  return (
    <div className="custom-tab-title">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

const CarSummary = ({ car }) => {
  const { t } = useTranslation()
  const {
    classCurrent: carClass,
    classFactory,
    collection,
    colorCurrent,
    colorStock,
    carRating = 0,
    experiencePoints = 0,
    driveTrainUpgrade = 0,
    dualExhaust = 0,
    performanceChip = 0,
    supercharger = 0,
    engineLevel,
    tiresLevel = 0,
    ethAddress,
    modelFactory,
    name,
    owner,
    id,
  } = car || {}

  return (
    <div className="CarDetailSummary">
      <div className="CarInfo">
        <div className="CarInfoLeft">
          <CarInfoItem title={t("car.collection")} value={collection} />
          <CarInfoItem
            title={t("car.owner")}
            value={owner?.username || ethAddress?.slice(0, 8) || <>&nbsp;</>}
          />
        </div>
        <div className="CarInfoRight">
          <CarInfoItem title={t("car.carClass")} value={carClass} />
          <CarInfoItem
            title={t("car.address")}
            value={ethAddress?.slice(0, 8) || ""}
          />
        </div>
      </div>
      <div className="CarStatusTabView">
        <Tabs defaultActiveKey="status">
          <TabPane
            key="status"
            className="status"
            tab={<TabTitle title={t("car.status")} iconName="status" />}
          >
            <div className="StatusCard">
              <ProgressBar
                label={t("car.carRating")}
                max={24000}
                value={carRating}
                type="dashboard"
                varient="secondary"
              />
            </div>
            <div className="StatusCard">
              <ProgressBar
                max={1000}
                type="circle"
                varient="secondary"
                value={experiencePoints}
                label={t("car.experiencePoints")}
              />
            </div>
          </TabPane>
          <TabPane
            tab={<TabTitle title={t("car.level")} iconName="level" />}
            key="level"
            className="level"
          >
            <ProgressBar
              max={1}
              value={driveTrainUpgrade}
              label={t("car.driveTrainUpgrade")}
            />
            <ProgressBar
              max={1}
              value={dualExhaust}
              label={t("car.dualExhaust")}
            />
            <ProgressBar
              max={1}
              value={performanceChip}
              label={t("car.performanceChip")}
            />
            <ProgressBar
              max={4}
              value={engineLevel}
              label={t("car.engineLevel")}
            />
            <ProgressBar
              max={1}
              value={supercharger}
              label={t("car.supercharger")}
            />
            <ProgressBar
              max={3}
              value={tiresLevel}
              label={t("car.tiresLevel")}
            />
          </TabPane>

          <TabPane
            key="details"
            className="details"
            tab={<TabTitle title={t("car.details")} iconName="details" />}
          >
            <CarInfoItem title={t("car.name")} value={`#${id} ${name}`} />
            <CarInfoItem title={t("car.model")} value={modelFactory} />
            <CarInfoItem title={t("car.collection")} value={collection} />
            <CarInfoItem title={t("car.carClass")} value={carClass} />
            <CarInfoItem title={t("car.classFactory")} value={classFactory} />
            <CarInfoItem title={t("car.colorCurrent")} value={colorCurrent} />
            <CarInfoItem title={t("car.factoryColor")} value={colorStock} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default CarSummary
