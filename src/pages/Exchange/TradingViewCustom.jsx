import React, { useEffect, useRef, useState } from "react"
import { priceData } from "./PriceData"
import { CrosshairMode, LineStyle, createChart } from "lightweight-charts"
import RangeSwitcher from "./RangeSwitcher"

const rangeSwitcher = [
  {
    label: "5m",
    value: "5m"
  },
  {
    label: "15m",
    value: "15m"
  },
  {
    label: "1h",
    value: "1h"
  },
  {
    label: "4h",
    value: "4h"
  },
  {
    label: "1D",
    value: "1d"
  }
]

const TradingViewCustom = (props) => {
  const [rangeSwitcherTime, setRangeSwitcherTime] = useState("5m")
  const { colors: { backgroundColor = "#0C0F13", textColor = "white" } = {} } = props

  const rangeSwitcherChange = (val) => {
    setRangeSwitcherTime(val)
  }

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
      height: 600
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

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      chart.remove()
    }
  }, [backgroundColor, textColor])

  return (
    <div>
      <RangeSwitcher setRangeSwitcher={setRangeSwitcherTime} rangeSwitcherValue={rangeSwitcherTime} />
      <div ref={chartContainerRef} />
    </div>
  )
}

export default TradingViewCustom
