// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react"
import { useExchangeContext } from "src/contexts/ExchangeContext"

let tvScriptLoadingPromise

const pairMapping = {
  "BTC/USD": "Binance:BTCUSDT",
  "ETH/USD": "Binance:ETHUSDT"
}

export default function TradingViewChart() {
  const onLoadScriptRef = useRef()
  const { pair } = useExchangeContext()

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script")
        script.id = "tradingview-widget-loading-script"
        script.src = "https://s3.tradingview.com/tv.js"
        script.type = "text/javascript"
        script.onload = resolve
        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

    return () => (onLoadScriptRef.current = null)

    function createWidget() {
      if (document.getElementById("tradingview_1327e") && "TradingView" in window) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: pairMapping[pair],
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#121217",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_1327e",
          hide_legend: true
        })
      }
    }
  }, [pair])

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_1327e" />
    </div>
  )
}
