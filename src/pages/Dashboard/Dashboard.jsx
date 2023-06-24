import React from "react"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"
import StatisticInfo from "@components/StatisticInfo/StatisticInfo"
import TradeForFree from "@components/TradeForFree/TradeForFree"
import Footer from "@components/Footer/Footer"

const Dashboard = () => {
  return (
    <div className="dashboard flex flex-col gap-20">
      <Banner />
      <TradeForFree />
      <StatisticInfo />
      <StandardAsset />
      <Footer />
    </div>
  )
}

export default Dashboard
