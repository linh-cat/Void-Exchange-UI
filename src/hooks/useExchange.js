import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { usePublicClient, useWalletClient } from "wagmi"
import { Exchange } from "@void-0x/void-sdk"

const useExchange = () => {
  const [isLoading, setIsLoading] = useState(false)

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const orderbookAddress = "0x5e263c7014ab3ae324f113c9abef573f4e6c4dde"
  const lensAddress = "0x5489ca9966067f3A2cA67370d9170d4F9171CCB7"

  const exchange = useMemo(() => {
    return new Exchange(publicClient, walletClient, orderbookAddress, lensAddress)
  }, [publicClient, walletClient])

  const placeOrder = async (params) => {
    if (!exchange) {
      return
    }

    setIsLoading(true)

    // const decimals = await vault.getDecimals()
    // console.log("amount", parseUnits(amount.toString(), decimals))
    // approve({
    //   args: [Constants.Addresses[chain.id].Exchanges.WETH, parseUnits(amount.toString(), decimals)],
    //   from
    // })

    const hash = await exchange.placeOrder(params)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsLoading(false)
    toast.success("Successfully deposited!")
  }

  return { isLoading, placeOrder }
}

export default useExchange
