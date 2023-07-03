import { useEffect, useMemo } from 'react'

import useWebSocket, { ReadyState } from "react-use-websocket"
import { useExchangeContext } from 'src/contexts/ExchangeContext'
import { formatUnits } from 'viem'

const marketPriceToken = {
    "BTC/USD": "BTC",
    "ETH/USD": "ETH"
}

const usePriceMarket = () => {
    const { pair } = useExchangeContext()

    const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket("wss://api.void.exchange")

    useEffect(() => {
        const option = pair === '' ? 'BTC' : marketPriceToken[pair]

        if (readyState === ReadyState.OPEN) {
            sendMessage(JSON.stringify({ type: "subscribe", channels: [option] }))
        }

        return () => {
            sendMessage(JSON.stringify({ type: "unsubscribe", channels: [option] }))
        }

    }, [getWebSocket, pair, readyState, sendMessage])

    const price = useMemo(() => {
        if (lastMessage?.data) {
            try {
                const data = JSON.parse(lastMessage.data)
                if (data.p) {
                    return formatUnits(data.p, 18).toLocaleString()
                }
            } catch (err) {
                console.error(err)
            }

            return undefined
        }
    }, [lastMessage])
    return { price }

}

export default usePriceMarket