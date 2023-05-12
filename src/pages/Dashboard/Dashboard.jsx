import React from "react"
import "./Dashboard.css"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"
import StatisticInfo from "@components/StatisticInfo/StatisticInfo"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Banner />
      <StatisticInfo />
      <StandardAsset />
    </div>
  )
}

export default Dashboard
