import React, { useMemo } from "react"
import "./index.css"
import Banner from "./Banner"
import SectionVaultStats from "./SectionVaultStats"
import { useParams } from "react-router-dom"

import { Constants } from "@void-0x/void-sdk"
import { useNetwork } from "wagmi"
import VaultDeposit from "./VaultDeposit"
import useVaultInfoToken from "src/hooks/useVaultInfoToken"
import VaultStrategy from "./VaultStrategy"

const Index = () => {
  let { id: vaultId } = useParams()
  const { chain } = useNetwork()

  const vaultInfo = useMemo(() => {
    switch (vaultId) {
      case "1":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.WETH,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.WETH
        }
      case "2":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.WBTC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.WBTC
        }
      case "4":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.USDC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.USDC
        }
      default:
        break
    }
  }, [chain?.id, vaultId])

  const { vaultItemInfo } = useVaultInfoToken({ vaultId })

  return (
    <div className="vault-detail">
      <Banner
        bg={vaultItemInfo?.bg}
        currentVault={vaultItemInfo?.currentDeposit}
        capacity={vaultItemInfo?.capacity}
        icon={vaultItemInfo?.icon}
        title={vaultItemInfo?.title}
        id={vaultItemInfo?.id}
        blurBg={vaultItemInfo?.blurBg}
      />
      <VaultStrategy />
      <VaultDeposit tokenAddress={vaultInfo?.tokenAddress} vaultAddress={vaultInfo?.vaultAddress} vaultId={vaultId} />
      <SectionVaultStats />
    </div>
  )
}

export default Index
