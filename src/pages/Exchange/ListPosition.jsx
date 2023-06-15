import React, { useState, useEffect, useMemo } from "react"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import { BTC } from "@img/token"

import { usePublicClient, useWalletClient, useAccount, useContractRead } from "wagmi"
import { Exchange, Position } from "@void-0x/void-sdk"
import FastPriceFeedABI from "../../abis/FastPriceFeed.json"
import { formatUnits } from "viem"

const nf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  roundingIncrement: 5
})

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
  const [exchange, setExchange] = useState(null)
  const [positions, setPositions] = useState([])

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const {
    data: indexPrice,
    isError,
    isLoading
  } = useContractRead({
    address: "0xaD0d06353e7fCa52BD40441a45D5A623d9284C0C",
    abi: FastPriceFeedABI.abi,
    functionName: "getPrice",
    args: ["0xB232278f063AB63592FCc612B3bc01662b7245f0", true]
  })

  useEffect(() => {
    if (publicClient && walletClient) {
      const exchange = new Exchange(
        publicClient,
        walletClient,
        "0x5e263C7014Ab3aE324f113C9abEf573f4e6C4DDE",
        "0x5489ca9966067f3A2cA67370d9170d4F9171CCB7"
      )

      setExchange(exchange)
    }
  }, [publicClient, walletClient, address])

  useEffect(() => {
    const getPositions = async () => {
      const positions = await exchange.getPositions(address)
      setPositions(positions.filter((position) => position.size > 0))
    }

    if (exchange) {
      getPositions()
    }
  }, [exchange])

  const formattedPositions = useMemo(() => {
    const formatteds = positions.map((position) => {
      const pnl = Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong)

      return {
        /* global BigInt */
        market: "WBTC/USDT",
        collateralValue: nf.format(BigInt(position.collateralValue / BigInt(1e20)).toString()),
        size: nf.format(BigInt(position.size / BigInt(1e20)).toString()),
        entryPrice: nf.format(BigInt(position.entryPrice / BigInt(1e12)).toString()),
        leverage: Position.getLeverage(position) + "x",

        isProfitable: pnl > 0,
        // entryprice: "$1,884.9",
        indexPrice: nf.format(formatUnits(indexPrice, 12)),
        pnlRoe: nf.format(
          formatUnits(
            Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong) / BigInt(1e8),
            12
          )
        ),
        type: position.isLong ? "long" : "short",
        token: "WBTC",
        netValue: nf.format(
          formatUnits(
            Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong) / BigInt(1e8) +
              position.collateralValue / BigInt(1e8),
            12
          )
        )
      }
    })
    return formatteds
  }, [positions, indexPrice])

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
            <img src={BTC} className="h-6 w-6" alt="eth" />
            <div>
              <label>{cell?.market}</label>
              <div className="text-xs green-up">
                {cell?.type} {cell?.leverage}
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
      field: "netValue",
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
            <label>{cell?.collateralValue}</label>
            <Button text="+" className="px-2 border inline-block" isDefault={false} onClick={toggleCollateral} />
          </div>
        )
      }
    },
    {
      field: "entryPrice",
      headerName: "Entry Price",
      headerClassName: "text-xs"
    },
    {
      field: "indexPrice",
      headerName: "Index Price",
      headerClassName: "text-xs"
    },
    {
      field: "pnlRoe",
      headerName: "Pnl & ROE",
      headerClassName: "text-xs",
      cellRenderer: (cell) => {
        return <div className={cell.isProfitable ? "green-up" : "red-down"}>{cell?.pnlRoe}</div>
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
      <TableCustom columnDef={columnDef} data={formattedPositions} cellStyle="p-3 text-xs" />
    </>
  )
}

export default ListPosition
