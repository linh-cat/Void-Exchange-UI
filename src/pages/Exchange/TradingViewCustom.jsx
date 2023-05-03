import React, { useEffect, useRef } from "react"
import { priceData } from "./PriceData"
import { CrosshairMode, LineStyle, createChart } from "lightweight-charts"

const TradingViewCustom = (props) => {
  const {
    colors: {
      backgroundColor = "#0C0F13",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)"
    } = {}
  } = props

  const chartContainerRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: backgroundColor },
        textColor
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" }
      },
      width: chartContainerRef.current.clientWidth,
      height: 300
    })
    chart.applyOptions({
      "paneProperties.background": "#16182e",
      "paneProperties.backgroundType": "solid"
    })
    chart.applyOptions({
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        mode: CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          width: 5,
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF"
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF"
        }
      }
    })
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#16BE76",
      downColor: "#E43E53",
      borderVisible: false,
      wickUpColor: "#16BE76",
      wickDownColor: "#E43E53"
    })
    candlestickSeries.setData(priceData)
    chart.timeScale().fitContent()

    // const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
    // newSeries.setData(data);

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      chart.remove()
    }
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

  return <div ref={chartContainerRef} />
}

export default TradingViewCustom
