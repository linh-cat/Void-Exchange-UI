import React from "react"
import "./Dashboard.css"

import StandardAsset from "@components/StandardAsset/StandardAsset"
import Banner from "@components/Banner/Banner"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Banner />
      <StandardAsset />
    </div>
  )
}

export default Dashboard
