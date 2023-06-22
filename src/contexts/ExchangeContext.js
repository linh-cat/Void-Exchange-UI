import { useContext, useState, createContext, useMemo, useEffect } from "react"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Exchange, Constants } from "@void-0x/void-sdk"
import { toast } from "react-hot-toast"
import { isChainSupported } from "src/lib/chains"

const ExchangeContext = createContext()

const pairToSymbolMap = {
  "ETH/USD": "WETH",
  "BTC/USD": "WBTC"
}

export function ExchangeContextProvider({ children }) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  // market is the address of the base token of a pair

  // index token
  const [indexToken, setIndexToken] = useState()
  // pair is the combination of base/quote
  // E.g: BTC/USD
  const [pair, setPair] = useState("")

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { chain } = useNetwork()

  const exchange = useMemo(() => {
    if (chain && isChainSupported(chain)) {
      return new Exchange(
        publicClient,
        walletClient,
        Constants.Addresses[chain.id].Exchange,
        Constants.Addresses[chain.id].Lens
      )
    }
  }, [publicClient, walletClient, chain])

  /**
   * Set default indexToken and pair for the market
   */
  useEffect(() => {
    console.log({ chain })
    if (chain) {
      // set default indexToken
      const token = Constants.Addresses[chain.id]?.IndexTokens?.WBTC
      setIndexToken(token)
    }
  }, [chain])

  /**
   * Update indexToken when the pair changes
   */
  useEffect(() => {
    if (chain && pair) {
      const symbol = pairToSymbolMap[pair]
      setIndexToken(Constants.Addresses[chain.id]?.IndexTokens?.[symbol])
    }
  }, [chain, pair])

  const placeOrder = async (params) => {
    if (!exchange) {
      return
    }

    setIsPlacingOrder(true)
    const hash = await exchange.placeOrder(params)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsPlacingOrder(false)
    toast.success("Successfully deposited!")
  }

  const getPositions = async (address) => {
    if (!exchange) {
      return []
    }

    const positions = await exchange.getPositions(address, chain.id)

    if (positions.length) {
      return positions.filter((position) => position.size > 0)
    }
    return []
  }

  const closeOrder = async (params) => {
    if (!exchange) {
      return
    }

    setIsPlacingOrder(true)
    const hash = await exchange.closeOrder(params)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsPlacingOrder(false)
    toast.success("Successfully deposited!")
  }

  return (
    <ExchangeContext.Provider
      value={{
        indexToken,
        setIndexToken,
        pair,
        setPair,
        isPlacingOrder,
        placeOrder,
        getPositions,
        closeOrder
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}

export function useExchangeContext() {
  const context = useContext(ExchangeContext)
  if (context === undefined) {
    throw new Error("Context must be used within a Provider")
  }
  return context
}
