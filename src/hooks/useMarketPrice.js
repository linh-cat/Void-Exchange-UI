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
  const [rawPrice, setRawPrice] = useState()
  const { pair } = useExchangeContext()
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket("wss://api.void.exchange")


  const previousPriceRef = useRef(0);

  useEffect(() => {
    // Update the previous price whenever the current price changes
    previousPriceRef.current = rawPrice;
  }, [rawPrice]);

  useEffect(() => {
    const option = pair === "" ? "BTC" : marketPriceToken[pair]

    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ type: "subscribe", channels: [option] }))
    }

    return () => {
      sendMessage(JSON.stringify({ type: "unsubscribe", channels: [option] }))
    }
  }, [getWebSocket, pair, readyState, sendMessage])

  const price = useMemo(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage?.data)
        if (data.p) {
          setRawPrice(formatUnits(data.p, 18))
          return priceFormatter.format(formatUnits(data.p, 18).toLocaleString())
        }
      } catch (err) {
        console.error(err)
      }

      return undefined
    }
  }, [lastMessage])


  const previousPrice = previousPriceRef.current;
  const priceChange = Number(rawPrice) - Number(previousPrice);
  const priceStatus = priceChange > 0 ? 1 : priceChange < 0 ? -1 : 0;

  return { price, status: priceStatus }
}

export default useMarketPrice
