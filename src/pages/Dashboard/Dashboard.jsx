import React from "react"
import "./Dashboard.css"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"
import StatisticInfo from "@components/StatisticInfo/StatisticInfo"
import TradeForFree from "@components/TradeForFree/TradeForFree"
import BgApp from "@components/BgApp/BgApp"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Banner />
      <TradeForFree />
      <StatisticInfo />
      <StandardAsset />
    </div>
  )
}

export default Dashboard
