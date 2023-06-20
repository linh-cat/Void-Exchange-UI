import React from "react"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"
import StatisticInfo from "@components/StatisticInfo/StatisticInfo"
import TradeForFree from "@components/TradeForFree/TradeForFree"

const Dashboard = () => {
  return (
    <div className="dashboard flex flex-col gap-5">
      <Banner />
      <TradeForFree />
      <StatisticInfo />
      <StandardAsset />
    </div>
  )
}

export default Dashboard
