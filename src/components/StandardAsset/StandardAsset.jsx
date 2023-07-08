import React from "react"
import { DownIconGreen, DownIconRed } from "@icons/index"
import Card from "@components/Card/Card"
import TableCustom from "@components/Table/TableCustom"
import cx from "classnames"
import { BTC, DOGE, ETH, POLYGON, SOLANA } from "@img/token"
import { DogeBG } from "@img/bg"

const columnDef = [
  {
    field: "asset",
    headerName: "Asset",
    headerClassName: "text-left",
    cellRenderer: (cell) => {
      return (
        <div className="flex gap-2 items-center">
          <img src={cell?.img} alt={cell?.asset} className="w-6 h-6 md:w-12 md:h-12" />
          <div className="text-left">
            <label>{cell?.asset}</label>
            <div className="text-slate-400">{cell?.acronym}</div>
          </div>
        </div>
      )
    }
  },
  {
    field: "price",
    headerName: "Price",
    formatter: (cell) => {
      let formatting_options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }
      let dollarString = new Intl.NumberFormat("en-US", formatting_options)
      let finalString = dollarString.format(cell?.price)
      return finalString
    }
  },
  {
    field: "24h",
    headerName: "24h Change",
    cellRenderer: (cell) => {
      let percentFormat = parseFloat(cell?.["24h"] * 100).toFixed(1) + "%"
      return (
        <div className="flex flex-col ">
          <div className="flex gap-2 justify-center">
            <img
              src={cell?.["24h"] > 0 ? DownIconGreen : DownIconRed}
              alt="down"
              className={cx({
                rotate180: cell?.["24h"] > 0
              })}
            />
            <div
              className={cx({
                "text-error": cell?.["24h"] < 0,
                "text-success": cell?.["24h"] > 0
              })}
            >
              {percentFormat}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    field: "volume",
    headerName: "24h Volume",
    formatter: (cell) => {
      let formatting_options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }
      let dollarString = new Intl.NumberFormat("en-US", formatting_options)
      let finalString = dollarString.format(cell?.volume)
      return finalString
    }
  },
  {
    field: "openInterest",
    headerName: "Open Interest",
    formatter: (cell) => {
      let formatting_options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }
      let dollarString = new Intl.NumberFormat("en-US", formatting_options)
      let finalString = dollarString.format(cell?.openInterest)
      return finalString
    }
  }
]
const dataForTable = [
  {
    id: 1,
    img: BTC,
    asset: "Bitcoin",
    acronym: "BTC",
    price: 2999124,
    "24h": 1,
    volume: 1123424,
    openInterest: 6796457
  },
  {
    id: 2,
    img: ETH,
    asset: "Ethereum",
    acronym: "ETH",
    price: 185602,
    "24h": -0.79,
    volume: 16576863,
    openInterest: 112634556
  },
  {
    id: 3,
    img: DOGE,
    asset: "Dogecoin",
    acronym: "Doge",
    price: 1,
    "24h": 2,
    volume: 1123434,
    openInterest: 12563563
  },
  {
    id: 4,
    img: SOLANA,
    asset: "Solana",
    acronym: "Sol",
    price: 299999,
    "24h": -1,
    volume: 121234341,
    openInterest: 34635435
  },
  {
    id: 5,
    img: POLYGON,
    asset: "Polygon",
    acronym: "Matic",
    price: 111111,
    "24h": 4,
    volume: 12324354,
    openInterest: 67956122
  }
]
const StandardAsset = () => {
  return (
    <div className="px-20 2xl:p-0">
      <Card className="standard-asset mt-10 container mx-auto max-w-7xl px-5 p-5" hasShadow={true}>
        <h3 className="font-medium text-lg p-3">Standard Assets</h3>
        <TableCustom columnDef={columnDef} data={dataForTable} cellStyle="px-3 py-4 border-b" />
      </Card>
    </div>
  )
}

export default StandardAsset
