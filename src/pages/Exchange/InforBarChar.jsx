import SelectCoupleToken from "@components/common/SelectCoupleToken"
import { GreenUpIcon } from "@icons/index"
import { Constants } from "@void-0x/void-sdk"
import React, { useMemo } from "react"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import usePriceInforbarChart from "src/hooks/usePriceInforbarChart"
import { useTokenPrice } from "src/hooks/useTokenPriceFeed"
import { dollarFormatter, formatValue, percentateFormatter } from "src/lib/formatter"

const InforBarChar = () => {
  const { pair, indexToken } = useExchangeContext()
  const { data } = usePriceInforbarChart()
  const indexPrice = useTokenPrice(indexToken)

  const dataForMapping = useMemo(() => {
    switch (pair) {
      case "BTC/USD":
        return data?.BTC
      case "ETH/USD":
        return data?.ETH
      default:
        return data?.BTC
    }
  }, [data, pair])

  return (
    <div className="top-chart w-full flex flex-col gap-3 2xl:gap-0 lg:flex-row lg:items-center py-3">
      <div className="h-full flex justify-between items-center px-3 lg:gap-3">
        <div>
          <SelectCoupleToken />
        </div>
        <div className="top-chart-price">
          <label className="text-xl green-up font-bold">0</label>
        </div>
      </div>
      <div className="group-infor px-3 py-1 xl:py-0 xl:px-0 flex gap-3 2xl:gap-5 overflow-x-auto no-scrollbar">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Mark</h3>
          <div className="text-xs mt-auto">0</div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Index</h3>
          <div className="text-xs mt-auto">
            {indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS) : 0}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Change(%)</h3>
          <div className="text-xs mt-auto flex items-center gap-1 green-up">
            <span>{percentateFormatter(dataForMapping?.priceChangePercent)} </span>
            <img src={GreenUpIcon} className="w-3 h-3" alt="greenup" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Change</h3>
          <div className="text-xs mt-auto green-up">{dollarFormatter(dataForMapping?.priceChange)}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h High</h3>
          <div className="text-xs mt-auto">{dollarFormatter(dataForMapping?.priceHigh24h)}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Low</h3>
          <div className="text-xs mt-auto">{dollarFormatter(dataForMapping?.priceLow24h)}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Volume</h3>
          <div className="text-xs mt-auto">1,505.660</div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Volume(BTC)</h3>
          <div className="text-xs mt-auto">55.003</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Next Fund Rate</h3>
          <div className="text-xs mt-auto red-down">-0.00013%</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-full w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Countdown</h3>
          <div className="text-xs mt-auto">00:46:00</div>
        </div>
      </div>
    </div>
  )
}

export default InforBarChar
