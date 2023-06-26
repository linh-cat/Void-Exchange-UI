import React, { useState, useEffect, useMemo } from "react"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"

import { useAccount, useNetwork } from "wagmi"
import { Position, Constants, OrderType, Side } from "@void-0x/void-sdk"
import useTokenPriceFeed from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { AddressToSymbolMap, Tokens } from "src/lib/tokens"
import { formatValue, descaleValue } from "src/lib/formatter"
import cx from "classnames"
import CLosingModal from "./CLosingModal"
import CollateralPopup from "./CollateralPopup"

const ListPosition = () => {
  const [isOpenedCollatoral, setIsOpenedCollatoral] = useState(false)
  const [collateralTab, setCollateralTab] = useState("add")
  const [positions, setPositions] = useState([])
  const [isCloseOrdered, setIsCloseOrdered] = useState(true)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { getPositions, closeOrder, isClosingOrder } = useExchangeContext()
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
  }, [getPositions, address, chain])

  const formattedPositions = useMemo(() => {
    if (!chain || !prices) {
      return []
    }

    const formatteds = positions.map((position) => {
      const indexToken = position.indexToken
      const collateralToken = position.collateralToken
      const indexPrice = prices[indexToken]
      const tokenDecimals = Constants.Addresses[chain?.id]?.TokenDecimals?.[collateralToken]

      const valueDecimals = tokenDecimals + Constants.ORACLE_PRICE_DECIMALS

      const pnl = descaleValue(
        Position.getPnl(position.size, position.entryPrice, indexPrice, position.isLong),
        tokenDecimals
      )

      const symbol = AddressToSymbolMap[chain.id][indexToken]
      const token = Tokens[chain.id][symbol]

      return {
        raw: position,
        market: `${token.name}/USD`,
        collateralValue: formatValue(position.collateralValue, valueDecimals),
        size: formatValue(position.size, valueDecimals),
        entryPrice: formatValue(position.entryPrice, Constants.ORACLE_PRICE_DECIMALS),
        leverage: Position.getLeverage(position) + "x",
        isProfitable: pnl > 0,
        indexPrice: formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS),
        pnlRoe: formatValue(pnl, Constants.ORACLE_PRICE_DECIMALS),
        type: position.isLong ? "long" : "short",
        token: symbol,
        netValue: formatValue(
          Position.getNetValue(position, indexPrice, tokenDecimals),
          Constants.ORACLE_PRICE_DECIMALS
        ),
        liquidationPrice: formatValue(
          Position.getLiquidationPrice(
            position,
            BigInt(Constants.POSITION_FEE),
            /* global BigInt */
            // TODO: fetch current funding rate from exchange
            BigInt(0),
            indexPrice,
            BigInt(Constants.MIN_MARGIN_RATIO_BPS)
          ),
          Constants.ORACLE_PRICE_DECIMALS
        ),
        icon: token.icon
      }
    })
    return formatteds
  }, [positions, prices, chain])

  const handleCloseOrder = async (cell) => {
    const position = cell.raw

    await closeOrder({
      orderType: OrderType.MARKET,
      indexToken: position.indexToken,
      size: position.size,
      collateralDelta: position.collateralValue,
      side: position.isLong ? Side.LONG : Side.SHORT,
      price: prices[position.indexToken]
    })
  }

  const toggleCollateral = () => {
    setIsOpenedCollatoral(!isOpenedCollatoral)
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
              <div
                className={cx("text-xs", {
                  "green-up": cell?.type === "long",
                  "red-down": cell?.type === "short"
                })}
              >
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
      headerClassName: "text-xs"
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "text-xs",
      cellRenderer: (cell) => {
        return (
          <Button
            text="close"
            isDefault={false}
            isLoading={isClosingOrder}
            disabled={isClosingOrder}
            className="border px-2 py-1"
            onClick={() => handleCloseOrder(cell)}
          />
        )
      }
    }
  ]

  return (
    <>
      <CLosingModal open={isCloseOrdered} setOpen={setIsCloseOrdered} />
      <CollateralPopup
        open={isOpenedCollatoral}
        setOpen={setIsOpenedCollatoral}
        collateralTab={collateralTab}
        setCollateralTab={setCollateralTab}
      />
      <TableCustom columnDef={columnDef} data={formattedPositions} cellStyle="p-3 text-xs" />
    </>
  )
}

export default ListPosition
