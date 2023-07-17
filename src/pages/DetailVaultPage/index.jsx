import React, { useMemo } from "react"

import { useNetwork } from "wagmi"
import { Constants } from "@void-0x/void-sdk"
import { useParams } from "react-router-dom"

import Banner from "./Banner"
import VaultDeposit from "./VaultDeposit"
import useVaultInfoToken from "src/hooks/useVaultInfoToken"
import VaultStrategy from "./VaultStrategy"
import VaultChart from "./VaultChart"

import "./index.css"

const Index = () => {
  let { id: vaultId } = useParams()
  const { chain } = useNetwork()

  const vaultInfo = useMemo(() => {
    switch (vaultId) {
      case "1":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.WETH,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.WETH,
          description:
            "WETH Vault holds funds that is backing ETH/USD Market. WETH is an ERC-20 token on the EVM blockchain that is pegged to Ether (ETH). The revenue is coming from trading fees and loss of traders. Additionally, liquidity providers will receive escrowed VOID token. When you deposit WBTC to the vault, you will get a converted amount of vWETH that is representing your shares in the vault. Revenue is distributed every 7 days."
        }
      case "2":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.WBTC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.WBTC,
          description:
            "WBTC Vault holds funds that is backing WBTC/USD Market. WBTC is an ERC-20 token on the EVM blockchain that is pegged to Bitcoin (BTC). The revenue is coming from trading fees and loss of traders. Additionally, liquidity providers will receive escrowed VOID token. When you deposit WBTC to the vault, you will get a converted amount of vWBTC that is representing your shares in the vault. Revenue is distributed every 7 days."
        }
      case "4":
        return {
          tokenAddress: Constants?.Addresses[chain?.id]?.Faucet?.USDC,
          vaultAddress: Constants?.Addresses[chain?.id]?.Vaults?.USDC,
          description:
            "USDC Vault holds funds that is backing short positions of all markets. The revenue is coming from trading fees and loss of traders. Additionally, liquidity providers will receive escrowed VOID token. When you deposit USDC to the vault, you will get a converted amount of vUSDC that is representing your shares in the vault. Revenue is distributed every 7 days."
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
      />
      <VaultStrategy description={vaultInfo?.description} />
      <VaultDeposit tokenAddress={vaultInfo?.tokenAddress} vaultAddress={vaultInfo?.vaultAddress} vaultId={vaultId} />
      <VaultChart />
    </div>
  )
}

export default Index
