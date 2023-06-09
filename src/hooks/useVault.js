import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { usePublicClient, useWalletClient } from "wagmi"
import { Vault } from "@void-0x/void-sdk"

const useVault = (tokenAddress, vaultAddress) => {
  const [isLoading, setIsLoading] = useState(false)

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const selectedVault = useMemo(() => {
    return new Vault(publicClient, walletClient, vaultAddress, tokenAddress)
  }, [publicClient, tokenAddress, vaultAddress, walletClient])

  const deposit = async (amount, from, receiver) => {
    if (!selectedVault) {
      return
    }

    setIsLoading(true)

    // const decimals = await vault.getDecimals()
    // console.log("amount", parseUnits(amount.toString(), decimals))
    // approve({
    //   args: [Constants.Addresses[chain.id].Vaults.WETH, parseUnits(amount.toString(), decimals)],
    //   from
    // })

    const hash = await selectedVault.deposit(amount, receiver)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsLoading(false)
    toast.success("Successfully deposited!")
  }

  return { isLoading, deposit }
}

export default useVault
