import React, { useEffect, useRef, useState } from "react"
import { priceData } from "./PriceData"
import { CrosshairMode, LineStyle, createChart } from "lightweight-charts"
import RangeSwitcher from "./RangeSwitcher"

const TradingViewCustom = (props) => {
  const [rangeSwitcherTime, setRangeSwitcherTime] = useState("5m")
  const { colors: { backgroundColor = "#0C0F13", textColor = "white" } = {} } = props

  const chartContainerRef = useRef()
  const chart = useRef()
  const resizeObserver = useRef()
  const [height, setHeight] = React.useState(0)

  const onResize = React.useCallback(() => {
    if (chartContainerRef.current) setHeight(chartContainerRef.current.clientHeight)
  }, [])

  useEffect(() => {
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
      height: chartContainerRef.current.clientHeight
    })

    console.log({ test: chartContainerRef.current.clientHeight })
    chart.applyOptions({
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        mode: CrosshairMode.Magnet,
        priceScale: {
          autoScale: true,
          borderColor: "#485c7b"
        },
        timeScale: {
          borderColor: "#485c7b"
        },
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

    window.addEventListener("resize", onResize)
    onResize()

    return () => {
      window.removeEventListener("resize", onResize)
      chart.remove()
    }
  }, [backgroundColor, onResize, textColor])

  // Resize chart on container resizes.
  //   useEffect(() => {
  //     resizeObserver.current = new ResizeObserver((entries) => {
  //       const { width, height } = entries[0].contentRect
  //       console.log({ width, height })
  //       chart.current?.applyOptions({ width, height })
  //       setTimeout(() => {
  //         chart.current?.timeScale().fitContent()
  //       }, 0)
  //     })

  //     resizeObserver.current.observe(chartContainerRef.current)

  //     return () => resizeObserver.current.disconnect()
  //   }, [chart])

  return (
    <div className="relative h-full">
      <RangeSwitcher setRangeSwitcher={setRangeSwitcherTime} rangeSwitcherValue={rangeSwitcherTime} />
      <div ref={chartContainerRef} className="chart-custom h-full" />
    </div>
  )
}

export default TradingViewCustom
