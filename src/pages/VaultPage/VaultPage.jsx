import Footer from "@components/Footer/Footer"
import SEO from "@components/common/SEO"
import React from "react"
import { Outlet } from "react-router-dom"
import { getPageTitle } from "src/lib/utils"

const VaultPage = () => {
  return (
    <SEO title={getPageTitle("Earn")}>
      <div className="flex flex-col gap-20">
        <Outlet />
        <Footer />
      </div>
    </SEO>
  )
}

export default VaultPage
