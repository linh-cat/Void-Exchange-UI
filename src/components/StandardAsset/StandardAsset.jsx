import React, { useMemo } from "react"
import { DownIconGreen, DownIconRed } from "@icons/index"
import Card from "@components/Card/Card"
import TableCustom from "@components/Table/TableCustom"
import cx from "classnames"
import { BTC, DOGE, ETH, MATIC, PEPE, POLYGON, SOLANA } from "@img/token"
import usePriceList from "src/hooks/usePriceList"
import { formatDollar, formatDollarDecimals, formatPercentage } from "src/lib/formatter"

const tokenImages = {
  BTC: BTC,
  DOGE: DOGE,
  ETH: ETH,
  MATIC: MATIC,
  POLYGON: POLYGON,
  SOL: SOLANA,
  PEPE: PEPE
}
const decimalFormats = {
  BTC: 2,
  DOGE: 2,
  ETH: 2,
  MATIC: 2,
  POLYGON: 2,
  SOL: 2,
  PEPE: 10
}

const columnDef = [
  {
    headerName: "Asset",
    headerClassName: "text-left",
    cellRenderer: (cell) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            src={tokenImages[cell?.symbol]}
            alt={cell?.symbol}
            className="w-6 h-6 md:w-12 md:h-12 border rounded-full"
          />
          <div className="text-left">
            <label>{cell?.symbol}</label>
            <div className="text-slate-400 text-sm">{cell?.label}</div>
          </div>
        </div>
      )
    }
  },
  {
    field: "price",
    headerName: "Price",
    formatter: (cell) => {
      return formatDollarDecimals(cell?.price, decimalFormats[cell?.symbol])
    }
  },
  {
    field: "percentChange1h",
    headerName: "1h Change",
    cellRenderer: (cell) => {
      return (
        <div className={cx({ "text-success": cell?.percentChange1h > 0, "text-error": cell?.percentChange1h < 0 })}>
          {formatDollar(cell.percentChange1h)}
        </div>
      )
    }
  },
  {
    field: "percentChange24h",
    headerName: "24h Change",
    cellRenderer: (cell) => {
      return (
        <div className="flex flex-col ">
          <div className="flex gap-2 justify-center">
            <img
              src={cell?.percentChange24h > 0 ? DownIconGreen : DownIconRed}
              alt="down"
              className={cx({
                rotate180: cell?.percentChange24h > 0
              })}
            />
            <div
              className={cx({
                "text-error": cell?.percentChange24h < 0,
                "text-success": cell?.percentChange24h > 0
              })}
            >
              {formatPercentage(cell?.percentChange24h)}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    field: "volumeChange24h",
    headerName: "24h Volume",
    formatter: (cell) => {
      return formatDollarDecimals(cell?.volumeChange24h, decimalFormats[cell?.symbol])
    }
  }
]

const StandardAsset = () => {
  const { data } = usePriceList()

  const dataForTable = useMemo(() => {
    if (data) {
      return data.map((item, idx) => ({
        id: idx,
        symbol: item?.symbol,
        label: item?.label,
        price: item?.price,
        percentChange1h: item?.percentChange1h,
        percentChange24h: item?.percentChange24h,
        volumeChange24h: item?.volumeChange24h
      }))
    }
    return []
  }, [data])

  console.log({ dataForTable })
  return (
    <div className="px-20 2xl:p-0">
      <Card className="standard-asset mt-10 container mx-auto max-w-7xl px-5 p-5" hasShadow={true}>
        <h3 className="font-medium text-lg">Standard Assets</h3>
        <TableCustom columnDef={columnDef} data={dataForTable} cellStyle="px-3 py-4 border-b" />
      </Card>
    </div>
  )
}

export default StandardAsset
