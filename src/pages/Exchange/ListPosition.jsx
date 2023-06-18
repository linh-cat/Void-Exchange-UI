import React, { useState, useEffect, useMemo } from "react"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"

import { useAccount, useToken, useNetwork } from "wagmi"
import { Position, Constants } from "@void-0x/void-sdk"
import useTokenPriceFeed from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { AddressToSymbolMap, Tokens } from "src/lib/tokens"

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  roundingIncrement: 5
})

const ListPosition = () => {
  const [collateral, setCollateral] = useState(false)
  const [collateralTab, setCollateralTab] = useState("add")
  const [positions, setPositions] = useState([])
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { exchange, getPositions } = useExchangeContext()
  const { prices } = useTokenPriceFeed([
    Constants.Addresses[chain?.id]?.IndexTokens?.WBTC,
    Constants.Addresses[chain?.id]?.IndexTokens?.WETH
  ])

  useEffect(() => {
    const get = async () => {
      const positions = await getPositions(address)
      setPositions(positions)
    }

    get()
  }, [exchange, address, chain])

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
    if (!chain || !prices) {
      return []
    }

    const formatteds = positions.map((position) => {
      const indexToken = position.indexToken
      const indexPrice = prices[indexToken]
      const tokenDecimals = Constants.Addresses[chain?.id]?.TokenDecimals?.[indexToken]

      const valueDecimals = tokenDecimals + Constants.ORACLE_PRICE_DECIMALS

      const pnl = descaleValue(
        Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong),
        tokenDecimals
      )

      const symbol = AddressToSymbolMap[chain.id][indexToken]
      const token = Tokens[chain.id][symbol]

      return {
        /* global BigInt */
        market: `${token.name}/USD`,
        collateralValue: formatValue(position.collateralValue, valueDecimals),
        size: formatValue(position.size, valueDecimals),
        entryPrice: formatValue(position.entryPrice, Constants.ORACLE_PRICE_DECIMALS),
        leverage: Position.getLeverage(position) + "x",
        isProfitable: pnl > 0,
        // entryprice: "$1,884.9",
        indexPrice: formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS),
        pnlRoe: formatValue(pnl, Constants.ORACLE_PRICE_DECIMALS),
        type: position.isLong ? "long" : "short",
        token: symbol,
        netValue: formatValue(
          Position.getNetValue(position, indexPrice, tokenDecimals),
          Constants.ORACLE_PRICE_DECIMALS
        ),
        icon: token.icon
      }
    })
    return formatteds
  }, [positions, prices, chain])

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
        return (
          <div className="flex items-center gap-2">
            <img src={cell?.icon} className="h-6 w-6" alt="eth" />
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
