import React, { useMemo } from "react"

import cx from "classnames"

import SelectCoupleToken from "@components/common/SelectCoupleToken"
import { Constants } from "@void-0x/void-sdk"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { useTokenPrice } from "src/hooks/useTokenPriceFeed"
import { formatDollar, formatPercentage, formatValue } from "src/lib/formatter"
import { DownIconGreen, DownIconRed } from "@icons/index"
import usePriceInfoBar from "src/hooks/usePriceInfoBar"
import useMarketPrice from "src/hooks/useMarketPrice"
import Countdown from "@components/CountDown/Countdown"

const InfoBarChar = () => {
  const { pair, indexToken } = useExchangeContext()
  const { data } = usePriceInfoBar()
  const indexPrice = useTokenPrice(indexToken)
  const { price: marketPrice, status } = useMarketPrice()

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
    <div className="top-chart w-full flex flex-col gap-3 2xl:gap-0 lg:flex-row lg:items-center vh-7">
      <div className="h-full flex justify-between items-center px-3 lg:gap-3">
        <div>
          <SelectCoupleToken />
        </div>
        <div className="top-chart-price">
          <label
            className={cx("text-xl font-bold", {
              "text-error": status === -1,
              "text-success": status === 1
            })}
          >
            {marketPrice && marketPrice}
          </label>
        </div>
      </div>
      <div className="group-infor px-3 py-1 xl:py-0 xl:px-0 flex gap-3 2xl:gap-5 overflow-x-auto no-scrollbar">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Mark</h3>
          <div className={cx("text-xs mt-auto")}>{marketPrice && marketPrice}</div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Index</h3>
          <div className="text-xs mt-auto">
            {indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS, false) : ""}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Change(%)</h3>
          <div className="text-xs mt-auto flex items-center gap-1 text-success">
            <span className={cx({ "text-error": Number(dataForMapping?.priceChangePercent) < 0 })}>
              {dataForMapping && formatPercentage(dataForMapping?.priceChangePercent)}
            </span>
            {dataForMapping && Number(dataForMapping?.priceChangePercent) > 0 && (
              <img src={DownIconGreen} className="w-2 h-2 rotate-180" alt="up" />
            )}
            {dataForMapping && Number(dataForMapping?.priceChangePercent) < 0 && (
              <img src={DownIconRed} className="w-2 h-2" alt="down" />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Change</h3>
          <div
            className={cx(
              {
                "text-error": Number(dataForMapping?.priceChange) < 0,
                "text-success": Number(dataForMapping?.priceChange) > 0
              },
              "text-xs mt-auto "
            )}
          >
            {dataForMapping && formatDollar(dataForMapping?.priceChange)}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h High</h3>
          <div className="text-xs mt-auto">{dataForMapping && formatDollar(dataForMapping?.priceHigh24h)}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">24h Low</h3>
          <div className="text-xs mt-auto">{dataForMapping && formatDollar(dataForMapping?.priceLow24h)}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
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
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Next Fund Rate</h3>
          <div className="text-xs mt-auto text-error">-0.00013%</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="h-3/5 w-1px bg-slate-700"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Countdown</h3>
          <div className="text-xs mt-auto">
            <Countdown time="2023-07-17T23:59:59Z" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBarChar
