import React, { useState } from "react"
import ETH from "@img/WETH.png"
import Plus from "@img/icons/Plus.svg"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"

const data = [
  {
    market: "ETH/USDT",
    type: "short",
    leverge: "10x",
    token: "ETH",
    size: "$49.9",
    netvalue: "$4.9",
    collateral: "1.96 USDT",
    entryprice: "$1,884.9",
    indexprice: "$2,001",
    pnlroe: "+ $0.35"
  }
]
const ListPosition = () => {
  const [collateral, setCollateral] = useState(false)
  const [collateralTab, setCollateralTab] = useState("add")

  const toggleCollateral = () => {
    setCollateral(!collateral)
  }

  const columnDef = [
    {
      field: "market",
      headerName: "Market",
      headerClassName: "text-xs text-left",
      classname: "text-left",
      cellRenderer: (cell) => {
        console.log({ cell })
        return (
          <div className="flex items-center gap-2">
            <img src={ETH} className="h-6 w-6" alt="eth" />
            <div>
              <label>{cell?.market}</label>
              <div className="text-xs red-down">
                {cell?.type} {cell?.leverge}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      field: "size",
      headerName: "Size",
      headerClassName: "text-xs"
    },
    {
      field: "netvalue",
      headerName: "Net Value",
      headerClassName: "text-xs"
    },
    {
      field: "collateral",
      headerName: "Collateral",
      headerClassName: "text-xs",
      cellRenderer: (cell) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <label>{cell?.collateral}</label>
            <Button text="+" className="px-2 border inline-block" isDefault={false} onClick={toggleCollateral} />
          </div>
        )
      }
    },
    {
      field: "entryprice",
      headerName: "Entry Price",
      headerClassName: "text-xs"
    },
    {
      field: "indexprice",
      headerName: "Index Price",
      headerClassName: "text-xs"
    },
    {
      field: "pnlroe",
      headerName: "Pnl & ROE",
      headerClassName: "text-xs",
      cellRenderer: (cell) => {
        return <div className="green-up">{cell?.pnlroe}</div>
      }
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "text-xs",
      cellRenderer: () => {
        return <Button text="close" isDefault={false} className="border px-2 py-1" />
      }
    }
  ]

  return (
    <>
      <CollateralPopup
        open={collateral}
        setOpen={setCollateral}
        collateralTab={collateralTab}
        setCollateralTab={setCollateralTab}
      />
      <TableCustom columnDef={columnDef} data={data} cellStyle="p-3 text-xs" />
    </>
  )
}

export default ListPosition
