import React from "react"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"
import StatisticInfo from "@components/StatisticInfo/StatisticInfo"
import Footer from "@components/Footer/Footer"
import AboutTradeDex from "@components/AboutTradeDex/AboutTradeDex"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-20">
      <Banner />
      <AboutTradeDex />
      <StatisticInfo />
      <StandardAsset />
      <Footer />
    </div>
  )
}

export default Dashboard
