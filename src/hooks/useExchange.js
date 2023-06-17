import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Exchange, Constants } from "@void-0x/void-sdk"
import { isChainSupported } from "src/lib/chains"

const useExchange = () => {
  const [isLoading, setIsLoading] = useState(false)

  const publicClient = usePublicClient()
  const { data: walletClient, isLoading: isWalletLoading } = useWalletClient()
  const { chain } = useNetwork()

  const exchange = useMemo(() => {
    if (chain && !isWalletLoading && isChainSupported(chain)) {
      return new Exchange(
        publicClient,
        walletClient,
        Constants.Addresses[chain.id].Exchange,
        Constants.Addresses[chain.id].Lens
      )
    }
  }, [publicClient, walletClient, isWalletLoading, chain])

  const placeOrder = async (params) => {
    if (!exchange) {
      return
    }

    setIsLoading(true)
    const hash = await exchange.placeOrder(params)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsLoading(false)
    toast.success("Successfully deposited!")
  }

  const getPositions = async (address) => {
    if (!exchange) {
      return []
    }

    const positions = await exchange.getPositions(address)

    if (positions.length) {
      return positions.filter((position) => position.size > 0)
    }
    return []
  }

  return { isLoading, placeOrder, getPositions }
}

export default useExchange
