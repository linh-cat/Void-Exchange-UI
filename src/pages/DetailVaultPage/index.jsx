import React, { useMemo } from "react"
import "./index.css"
import Banner from "./Banner"
import SectionVaultStats from "./SectionVaultStats"
import { useParams } from "react-router-dom"

import { Constants } from "@void-0x/void-sdk"
import { useNetwork } from "wagmi"
import VaultDeposit from "./VaultDeposit"

const Index = () => {
  let { id: vaultID } = useParams()
  const { chain } = useNetwork()

  const vaultInfor = useMemo(() => {
    switch (vaultID) {
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
  }, [chain?.id, vaultID])

  return (
    <div className="vault-detail">
      <Banner />
      <VaultDeposit tokenAddress={vaultInfor?.tokenAddress} vaultAddress={vaultInfor?.vaultAddress} />
      <SectionVaultStats />
    </div>
  )
}

export default Index
