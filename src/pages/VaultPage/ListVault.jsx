import React from "react"
import VaultCard from "@components/common/VaultCard"
import { vaultLists } from "./config"

const ListVault = () => {
  return (
    <div className="vailt-list grid grid-cols-1 sm:grid-cols-2 gap-1 md:grid-cols-2 md:gap-2 xl:grid-cols-4 xl:gap-4 2xl:gap-6 p-3 md:p-0 container-vault container max-w-7xl mx-auto mt-10">
      {vaultLists.map((item) => (
        <VaultCard title={item.title} bg={item.bg} hoverBg={item.hoverBg} icon={item.icon} id={item.id} />
      ))}
    </div>
  )
}

export default ListVault
