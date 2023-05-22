import React from "react"
import { Outlet } from "react-router-dom"

const VaultPage = () => {
  return (
    <div className="container-vault container mx-auto mt-10">
      <Outlet />
    </div>
  )
}

export default VaultPage
