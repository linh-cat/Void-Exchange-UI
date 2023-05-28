import React, { useState } from "react"
import ETH from "@img/WETH.png"
import Plus from "@img/icons/Plus.svg"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"

const columnDef = [
  {
    field: "market",
    headerName: "Market"
  },
  {
    field: "size",
    headerName: "Size"
  },
  {
    field: "netvalue",
    headerName: "Net Value"
  },
  {
    field: "collateral",
    headerName: "Collateral"
  },
  {
    field: "entryprice",
    headerName: "Entry Price"
  },
  {
    field: "indexprice",
    headerName: "Index Price"
  },
  {
    field: "pnlroe",
    headerName: "Pnl & ROE"
  },
  {
    field: "action",
    headerName: "Actions"
  }
]
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
    pnlroe: "+ $0.35",
    action: ""
  }
]
const ListPosition = () => {
  const [collateral, setCollateral] = useState(false)
  const [collateralTab, setCollateralTab] = useState("add")

  const toggleCollateral = () => {
    setCollateral(!collateral)
  }
  return (
    <>
      <CollateralPopup
        open={collateral}
        setOpen={setCollateral}
        collateralTab={collateralTab}
        setCollateralTab={setCollateralTab}
      />
      <TableCustom columnDef={columnDef} data={data} />
    </>
  )
}

export default ListPosition
