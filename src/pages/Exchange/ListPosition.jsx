import React, { useState, useEffect, useMemo } from "react"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import { BTC } from "@img/token"

import { usePublicClient, useWalletClient, useAccount, useContractRead, useToken } from "wagmi"
import { Exchange, Position, Constants } from "@void-0x/void-sdk"
import FastPriceFeedABI from "../../abis/FastPriceFeed.json"
import { formatUnits } from "viem"

const numberFormatter = new Intl.NumberFormat("en-US", {
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
const ListPosition = ({ tokenAddress = "0xB232278f063AB63592FCc612B3bc01662b7245f0" }) => {
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
    args: [tokenAddress, true]
  })

  const {
    data: token,
    isError: tokenError,
    isLoading: isTokenLoading
  } = useToken({
    address: tokenAddress
  })

  console.log("token", token)

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

  /**
   * formatValue: Format a BigInt value to a human readable string
   *
   * @param {bigint} value
   * @param {number} decimals
   */
  const formatValue = (value, decimals) => {
    return numberFormatter.format(descaleValue(value, decimals)).toString()
  }

  /**
   * descaleValue: Descale a BigNumber value by 10**decimals
   *
   * @param {bigint} value
   * @param {number} decimals
   */
  const descaleValue = (value, decimals) => {
    return value / BigInt(10 ** decimals)
  }

  const formattedPositions = useMemo(() => {
    if (!token) {
      return []
    }

    const valueDecimals = token.decimals + Constants.ORACLE_PRICE_DECIMALS

    const formatteds = positions.map((position) => {
      const pnl = descaleValue(
        Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong),
        token.decimals
      )

      return {
        /* global BigInt */
        market: "WBTC/USDT",
        collateralValue: formatValue(position.collateralValue, valueDecimals),
        size: formatValue(position.size, valueDecimals),
        entryPrice: formatValue(position.entryPrice, Constants.ORACLE_PRICE_DECIMALS),
        leverage: Position.getLeverage(position) + "x",
        isProfitable: pnl > 0,
        // entryprice: "$1,884.9",
        indexPrice: formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS),
        pnlRoe: formatValue(pnl, Constants.ORACLE_PRICE_DECIMALS),
        type: position.isLong ? "long" : "short",
        token: "WBTC",
        netValue: formatValue(
          Position.getNetValue(position, indexPrice, token.decimals),
          Constants.ORACLE_PRICE_DECIMALS
        )
      }
    })
    return formatteds
  }, [positions, token, indexPrice])

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
      field: "liquidationPrice",
      headerName: "Liquidation Price",
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

// [x]1. Load token decimals from somewhere? How to get the token deicmals. Given the token address, we can get the token decimals
//  [x] 1.1. Load from constants
//  [x] 1.2. If not exists, load useContractRead
// 2. Create hook to get Price given the token address
// 3. Use exchnage instead of hook
// 4. Dyanmic market, don't hardcode anymore
// 5. Calc liquidation price
