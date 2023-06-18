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
  //
  const [token, setToken] = useState("")
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
   * Set default token and pair for the market
   */
  useEffect(() => {
    if (chain) {
      // set default token
      const token = Constants.Addresses[chain.id]?.IndexTokens?.WBTC
      setToken(token)
      setPair("BTC/USD")
    }
  }, [chain])

  /**
   * Update token when the pair changes
   */
  useMemo(() => {
    const symbol = pairToSymbolMap[pair]
    setToken(Constants.Addresses[chain.id]?.IndexTokens?.[symbol])
  }, [chain.id, pair])

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
    console.log("position", positions, address)

    if (positions.length) {
      return positions.filter((position) => position.size > 0)
    }
    return []
  }

  return (
    <ExchangeContext.Provider
      value={{
        token,
        setToken,
        pair,
        setPair,
        isPlacingOrder,
        placeOrder,
        getPositions
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
