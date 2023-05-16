import VaultCard from "@components/common/VaultCard"
import React from "react"

const VaultPage = () => {
  return (
    <div className="container-vault container mx-auto mt-10">
      <div className="vailt-list grid grid-cols-1 sm:grid-cols-2 gap-1 md:grid-cols-3 md:gap-2 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6 p-3 md:p-0">
        <VaultCard />
        {/* <VaultCard />
        <VaultCard />
        <VaultCard />
        <VaultCard /> */}
      </div>
    </div>
  )
}

export default VaultPage
