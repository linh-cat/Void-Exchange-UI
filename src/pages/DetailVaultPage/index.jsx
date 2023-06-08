import React, { useMemo } from "react"
import "./index.css"
import Banner from "./Banner"
import SectionVaultDeposit from "./SectionVaultDeposit"
import SectionVaultStats from "./SectionVaultStats"
import { useParams } from "react-router-dom"
import { Addresses } from "./config"

import { Constants } from "@void-0x/void-sdk"
import { useNetwork } from "wagmi"

const Index = () => {
  let { id: vaultID } = useParams()
  const { chain } = useNetwork()

  const vaultInfor = useMemo(() => {
    switch (vaultID) {
      case "1":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Vaults?.WETH,
          vaultAddress: Constants?.Addresses[chain?.id]?.Faucet?.WETH
        }
      case "2":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Vaults?.WBTC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Faucet?.WBTC
        }
      case "3":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Vaults?.USDC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Faucet?.USDC
        }
      default:
        break
    }
  }, [chain?.id, vaultID])

  return (
    <div className="vault-detail">
      <Banner />
      <SectionVaultDeposit tokenAddress={vaultInfor?.tokenAddress} vaultAddress={vaultInfor?.vaultAddress} />
      <SectionVaultStats />
    </div>
  )
}

export default Index
