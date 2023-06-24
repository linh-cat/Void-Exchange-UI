import Footer from "@components/Footer/Footer"
import React from "react"
import { Outlet } from "react-router-dom"

const VaultPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <Outlet />
      <Footer />
    </div>
  )
}

export default VaultPage
