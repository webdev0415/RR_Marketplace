import React from "react"
import { Slider } from "antd"

const SlideBar = ({ label, value = 0, maxValue = 1 }) => (
  <div className="property-slide">
    <div className="property-slide-title">{label}</div>
    <span className="unit">
      {value} of {maxValue}
    </span>
     
    <Slider
      included
      defaultValue={0}
      value={value}
      tooltipVisible={false}
      disabled
      max={maxValue}
    />
  </div>
)

const CarLevels = ({
  carInfo: {
    driveTrainUpgrade,
    dualExhaust,
    performanceChip,
    engineLevel,
    supercharger,
    tiresLevel,
  },
}) => (
  <div>
    <SlideBar label="Drive Train Upgrade" value={driveTrainUpgrade} />
    <SlideBar label="Dual Exhaust" value={dualExhaust} />
    <SlideBar label="Performance Chip" value={performanceChip} />
    <SlideBar label="Engine Level" value={engineLevel} maxValue={4} />
    <SlideBar label="Supercharger" value={supercharger} />
    <SlideBar label="Tires Level" value={tiresLevel} maxValue={3} />
  </div>
)

export default CarLevels
