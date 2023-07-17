import { useContext, useState, createContext, useMemo, useEffect } from "react"
import { usePublicClient, useWalletClient, useNetwork, useContractEvent } from "wagmi"
import { Exchange, Constants } from "@void-0x/void-sdk"
import { isChainSupported } from "src/lib/chains"
import { decodeEventLog, parseAbi } from "viem"
import useLocalStorage from "src/hooks/useLocalStorage"

const ExchangeContext = createContext()

const pairToSymbolMap = {
  "ETH/USD": "WETH",
  "BTC/USD": "WBTC"
}

export function ExchangeContextProvider({ children }) {
  const [orders, setSavedOrders, clearLocalStorage] = useLocalStorage("orderId")
  const [, , clearLocal] = useLocalStorage("confirm.info")

  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [isClosingOrder, setIsClosingOrder] = useState(false)
  const [shouldRefreshPositions, setShouldRefreshPositions] = useState(false)
  const [shouldShowPlaceOrderPopup, setShouldShowPlaceOrderPopup] = useState(false)
  const [shouldShowClosePopup, setShouldShowClosePopup] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState({ show: false, message: null })
  const [executePopup, setShowPopupExecute] = useState({
    type: "open",
    enable: false
  })

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
    address: Constants.Addresses[chain?.id]?.Exchange,
    abi: Exchange.getABI(),
    eventName: "OrderExecuted",
    listener(log) {
      console.log("useContractEvent OrderExecuted", log)
      setShouldRefreshPositions(true)
      const orderId = log[0].args.orderId
      const listOrders = orders()

      if (listOrders.orderId === Number(orderId) && listOrders.type === "open") {
        setShouldShowPlaceOrderPopup(false)
        setShowPopupExecute({ enable: true, type: "open" })
      }

      if (listOrders.orderId === Number(orderId) && listOrders.type === "close") {
        setShouldShowClosePopup(false)
        setShowPopupExecute({ enable: true, type: "close" })
        clearLocal()
      }

      setTimeout(() => {
        setShowPopupExecute({ enable: false, type: "open" })
        clearLocalStorage()
      }, 5000)
    }
  })

  /**
   * Set default indexToken and pair for the market
   */
  useEffect(() => {
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

    try {
      setIsPlacingOrder(true)
      const hash = await exchange.placeOrder(params)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      const log = receipt.logs[2]

      const event = decodeEventLog({
        abi: parseAbi(["event OrderPlaced(uint256 indexed orderId)"]),
        data: log.data,
        topics: log.topics
      })

      const orderId = event.args?.orderId
      setSavedOrders({ orderId: Number(orderId), type: "open" })

      setIsPlacingOrder(false)
      setShouldShowPlaceOrderPopup(true)
    } catch (error) {
      setShowErrorModal({ show: true, message: error })
      setTimeout(() => {
        setShowErrorModal({ show: false, message: null })
        setIsPlacingOrder(false)
        clearLocalStorage()
      }, 5000)
    }
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

    try {
      setIsClosingOrder(true)
      const hash = await exchange.closeOrder(params)
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      const log = receipt.logs[0]
      const event = decodeEventLog({
        abi: parseAbi(["event OrderPlaced(uint256 indexed orderId)"]),
        data: log.data,
        topics: log.topics
      })

      const orderId = event.args?.orderId
      setSavedOrders({ orderId: Number(orderId), type: "close" })
      setIsClosingOrder(false)
      setShouldShowClosePopup(true)
    } catch (error) {
      setShowErrorModal({ show: true, message: error })
      setTimeout(() => {
        setShowErrorModal({ show: false, message: null })
        setIsClosingOrder(false)
        clearLocal()
      }, 5000)
    }
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
        shouldRefreshPositions,
        executePopup,
        shouldShowPlaceOrderPopup,
        shouldShowClosePopup,
        showErrorModal
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
 * @property {boolean} shouldShowClosePopup  - A boolean indicating if the positions should be refreshed.
 * @property {Object} executePopup
 * @property {Object} showErrorModal - User reject transaction
 * @property {boolean} shouldShowPlaceOrderPopup - A boolean indicating when place ordered.
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
