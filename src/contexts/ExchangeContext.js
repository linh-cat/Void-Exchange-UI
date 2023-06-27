import { useContext, useState, createContext, useMemo, useEffect } from "react"
import { usePublicClient, useWalletClient, useNetwork, useContractEvent } from "wagmi"
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
  const [isClosingOrder, setIsClosingOrder] = useState(false)
  const [shouldRefreshPositions, setShouldRefreshPositions] = useState(false)
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

  useContractEvent({
    address: Constants.Addresses[chain.id].Exchange,
    abi: Exchange.getABI(),
    eventName: "OrderExecuted",
    listener(log) {
      // TODO: filter logs by account
      setShouldRefreshPositions(true)
    }
  })

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
    setShouldRefreshPositions(false)

    if (positions.length) {
      return positions.filter((position) => position.size > 0)
    }

    return []
  }

  const closeOrder = async (params) => {
    if (!exchange) {
      return
    }

    setIsClosingOrder(true)
    const hash = await exchange.closeOrder(params)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsClosingOrder(false)
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
        isClosingOrder,
        closeOrder,
        getPositions,
        shouldRefreshPositions
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}
/**
 * The Exchange context object.
 * @typedef {Object} ExchangeContextType
 * @property {string} indexToken - The index token.
 * @property {function} setIndexToken - The function to set the index token.
 * @property {string} pair - The combination of base/quote. Eg: BTC/USD
 * @property {function} setPair - The function to set the pair.
 * @property {boolean} isPlacingOrder - A boolean indicating if an order is being placed.
 * @property {boolean} shouldRefreshPositions - A boolean indicating if the positions should be refreshed.
 * @property {function} placeOrder - The function to place an order.
 * @property {boolean} isClosingOrder - A boolean indicating if an order is being closed.
 * @property {function} closeOrder - The function to close an order.
 * @property {function} getPositions - The function to get positions.
 */

/**
 * A hook to return the Exchange context object.
 * @function useExchangeContext
 * @returns {ExchangeContextType} - The Exchange context object.
 * @throws {Error} - Throws if context is undefined.
 */

export function useExchangeContext() {
  const context = useContext(ExchangeContext)
  if (context === undefined) {
    throw new Error("Context must be used within a Provider")
  }
  return context
}
