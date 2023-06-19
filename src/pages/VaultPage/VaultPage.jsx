import Footer from "@components/Footer/Footer"
import React from "react"
import { Outlet } from "react-router-dom"

const VaultPage = () => {
  return (
    <div className="">
      <Outlet />
      <Footer />
    </div>
  )
}

export default VaultPage
