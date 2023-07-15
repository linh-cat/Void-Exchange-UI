import React from "react"
import { vaultLists } from "./config"
import VaultCard from "./VaultCard"

const ListVault = () => {
  return (
    <div className="vailt-list px-10 2xl:px-0 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 container-vault container max-w-7xl mx-auto mt-10">
      {vaultLists.map((item) => (
        <VaultCard
          title={item.title}
          bg={item.bg}
          hoverBg={item.hoverBg}
          icon={item.icon}
          id={item.id}
          backedByIcon={item?.backedByIcon}
          risk={item.risk}
          badge={item.badge}
          disabled={item.disabled}
          dataLineChart={item.dataLineChart}
        />
      ))}
    </div>
  )
}

export default ListVault
