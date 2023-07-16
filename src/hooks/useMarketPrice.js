import { useEffect, useMemo, useRef, useState } from "react"

import useWebSocket, { ReadyState } from "react-use-websocket"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { formatUnits } from "viem"

const marketPriceToken = {
  "BTC/USD": "BTC",
  "ETH/USD": "ETH"
}
const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const useMarketPrice = () => {
  const [currentPrice, setCurrentPrice] = useState(0)
  const [previousPrice, setPreviousPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)

  const { pair } = useExchangeContext()
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket("wss://api.void.exchange")

  useEffect(() => {
    const option = pair === "" ? "BTC" : marketPriceToken[pair]

    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ type: "subscribe", channels: [option] }))
    }

    return () => {
      sendMessage(JSON.stringify({ type: "unsubscribe", channels: [option] }))
    }
  }, [getWebSocket, pair, readyState, sendMessage])

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage?.data)
        if (data && data.p && Number(formatUnits(data.p, 18)) !== Number(currentPrice)) {
          setPriceChange(Number(formatUnits(data.p, 18)) - Number(currentPrice))
          setPreviousPrice(Number(currentPrice))
          setCurrentPrice(formatUnits(data.p, 18))
        }
      } catch (err) {
        console.error(err)
      }

      return undefined
    }
  }, [currentPrice, lastMessage, priceChange])

  const status = useMemo(() => {
    return priceChange < 0 ? -1 : 1
  }, [priceChange])

  return { price: priceFormatter.format(currentPrice.toLocaleString()), status }
}

export default useMarketPrice
