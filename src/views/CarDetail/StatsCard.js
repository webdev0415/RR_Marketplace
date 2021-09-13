import React from "react"

const StatsCard = ({ label, value }) => (
  <div className="stats-card">
    <span className="card-title">{label}</span>
    <span className="card-value">{value}</span>
  </div>
)

export default StatsCard
