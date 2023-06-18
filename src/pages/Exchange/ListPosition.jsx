import React, { useState, useEffect, useMemo } from "react"
import CollateralPopup from "@components/common/CollateralPopup"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import { BTC } from "@img/token"

import { useAccount, useToken, useNetwork } from "wagmi"
import { Position, Constants } from "@void-0x/void-sdk"
import useTokenPriceFeed from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"

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
  // const { getPositions } = useExchange()
  const { getPositions, token: tokenAddress, pair } = useExchangeContext()
  const { indexPrice } = useTokenPriceFeed(tokenAddress)

  const {
    data: token,
    isError: tokenError,
    isLoading: isTokenLoading
  } = useToken({
    address: tokenAddress
  })

  useEffect(() => {
    const get = async () => {
      const positions = await getPositions(address)
      setPositions(positions)
    }

    get()
  }, [address, chain])

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
    if (!token || !indexPrice) {
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
        market: pair,
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
