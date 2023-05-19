import React from "react"
import "./index.css"
import Banner from "./Banner"
import SectionVaultDeposit from "./SectionVaultDeposit"
import SectionVaultStats from "./SectionVaultStats"

const Index = () => {
  return (
    <div className="vault-detail">
      <Banner />
      <SectionVaultDeposit />
      <SectionVaultStats />
    </div>
  )
}

export default Index
