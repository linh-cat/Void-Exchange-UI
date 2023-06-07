import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { usePublicClient, useWalletClient, useNetwork, useContractWrite, erc20ABI, useAccount } from "wagmi"
import { Vault, Constants } from "@void-0x/void-sdk"

import { isChainSupported } from "src/lib/chains"

const useVault = (tokenAddress) => {
  const [isLoading, setIsLoading] = useState(false)
  const [vault, setVault] = useState(null)

  const publicClient = usePublicClient()
  const { data: walletClient, isLoading: isWalletLoading } = useWalletClient()
  const { chain } = useNetwork()

  useEffect(() => {
    if (chain && !isWalletLoading && isChainSupported(chain)) {
      // const wbtcFaucet = new Vault(publicClient, walletClient, Constants.Addresses[chain.id].Vaults.WBTC)
      const wethFaucet = new Vault(publicClient, walletClient, Constants.Addresses[chain.id].Vaults.WETH, tokenAddress)
      // const usdcFaucet = new Faucet(publicClient, walletClient, Constants.Addresses[chain.id].Faucet.USDC)
      setVault(wethFaucet)
    }
  }, [isLoading, chain, publicClient, walletClient, isWalletLoading, tokenAddress])

  const deposit = async (amount, from, receiver) => {
    if (!vault) {
      return
    }

    setIsLoading(true)

    // const decimals = await vault.getDecimals()
    // console.log("amount", parseUnits(amount.toString(), decimals))
    // approve({
    //   args: [Constants.Addresses[chain.id].Vaults.WETH, parseUnits(amount.toString(), decimals)],
    //   from
    // })

    const hash = await vault.deposit(amount, receiver)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsLoading(false)
    toast.success("Successfully deposited!")
  }

  return { isLoading, deposit }
}

export default useVault
