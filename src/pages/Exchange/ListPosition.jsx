import React, { useState, useEffect, useMemo, useCallback } from "react"
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
  const [isCloseOrdered, setIsCloseOrdered] = useState(false)
  const [confirmOrderInfo, setConfimOrderInfo] = useState()
  const [closeAmount, setCloseAmmount] = useState()

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

  const handleConfirmOrder = (cell) => {
    setIsCloseOrdered(true)
    setCloseAmmount(cell?.raw?.collateralValue)
    setConfimOrderInfo(cell)
  }

  const handleCloseOrder = useCallback(async () => {
    const position = confirmOrderInfo?.raw
    await closeOrder({
      orderType: OrderType.MARKET,
      indexToken: position.indexToken,
      size: position.size,
      collateralDelta: position.collateralValue,
      side: position.isLong ? Side.LONG : Side.SHORT,
      price: prices[position.indexToken]
    })

    if (!isClosingOrder) {
      setIsCloseOrdered(false)
      setConfimOrderInfo()
      setCloseAmmount()
    }
  }, [closeOrder, confirmOrderInfo?.raw, isClosingOrder, prices])

  const calculateCloseAmount = useCallback(
    (percent) => {
      const position = confirmOrderInfo?.raw

      return (position?.collateralValue * BigInt(percent)) / BigInt(100)
    },
    [confirmOrderInfo]
  )

  const toggleCollateral = () => {
    setIsOpenedCollatoral(!isOpenedCollatoral)
  }

  const headerModal = useMemo(() => {
    return confirmOrderInfo ? (
      <div>
        <div className="flex gap-3">
          <div>Close {confirmOrderInfo?.token} Position -</div>
          <div
            className={cx(
              { "green-up": confirmOrderInfo?.type === "long", "red-down": confirmOrderInfo?.type === "short" },
              "capitalize"
            )}
          >
            {confirmOrderInfo?.type} {confirmOrderInfo?.leverage}
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  }, [confirmOrderInfo])

  const bodyModal = useMemo(() => {
    const collateralToken = confirmOrderInfo?.raw?.collateralToken
    const tokenDecimals = Constants.Addresses[chain?.id]?.TokenDecimals?.[collateralToken]
    const valueDecimals = tokenDecimals + Constants.ORACLE_PRICE_DECIMALS

    return confirmOrderInfo ? (
      <div className="flex flex-col gap-5 ">
        <div className="grid grid-cols-2 gap-3">
          <div className="border py-2 px-2 rounded text-left ">
            <h5 className="text-slate-500 text-sm">Market Price</h5>
            <div className="text-sm">{confirmOrderInfo?.indexPrice}</div>
          </div>
          <div className="border py-2 px-2 rounded text-left">
            <h5 className="text-slate-500 text-sm">Order Type</h5>
            <div className="text-sm">Market</div>
          </div>
        </div>
        <div className="border p-2 flex flex-col gap-3">
          <div className="flex justify-between">
            <h5 className="text-sm text-slate-500">Close Amount</h5>
            <div className="text-slate-500 text-sm">Max: {confirmOrderInfo?.collateralValue}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{formatValue(closeAmount, valueDecimals)}</div>
            <div className="text-sm">{confirmOrderInfo?.token}</div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div
              className={cx("bg-slate-900 py-1 rounded cursor-pointer", {
                active: closeAmount === calculateCloseAmount(25)
              })}
              onClick={() => {
                const amount = calculateCloseAmount(25)
                setCloseAmmount(amount)
              }}
            >
              25%
            </div>
            <div
              className={cx("bg-slate-900 py-1 rounded cursor-pointer", {
                active: closeAmount === calculateCloseAmount(50)
              })}
              onClick={() => {
                const amount = calculateCloseAmount(50)
                setCloseAmmount(amount)
              }}
            >
              50%
            </div>
            <div
              className={cx("bg-slate-900 py-1 rounded cursor-pointer", {
                active: closeAmount === calculateCloseAmount(75)
              })}
              onClick={() => {
                const amount = calculateCloseAmount(75)
                setCloseAmmount(amount)
              }}
            >
              75%
            </div>
            <div
              className={cx("bg-slate-900 py-1 rounded cursor-pointer", {
                active: closeAmount === calculateCloseAmount(100)
              })}
              onClick={() => {
                const amount = calculateCloseAmount(100)
                setCloseAmmount(amount)
              }}
            >
              100%
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="text-slate-500 text-sm">Profits In</h5>
          <div className="flex items-center gap-1">
            <img src={confirmOrderInfo?.icon} className="w-4 h-4" alt="token" />
            <div className="text-sm">{confirmOrderInfo?.token}</div>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-800"></div>
        <div className="flex flex-col gap-2">
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Entry & Index Price</h5>
            <div className="text-sm">{confirmOrderInfo?.entryPrice}</div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Market</h5>
            <div className="text-sm">{confirmOrderInfo?.market}</div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Size</h5>
            <div className="text-sm">
              <div className="">{confirmOrderInfo?.size}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Leverage</h5>
            <div className="text-sm flex items-center gap-1">
              <div className="">{confirmOrderInfo?.leverage}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Liq. Price</h5>
            <div className="text-sm">
              <div>{confirmOrderInfo?.liquidationPrice}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Collateral</h5>
            <div className="text-sm">
              <div>{confirmOrderInfo?.collateralValue}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Pnl & Roe</h5>
            <div className="text-sm flex items-center gap-1">
              <div
                className={cx({
                  "green-up": confirmOrderInfo?.isProfitable,
                  "red-down": !confirmOrderInfo?.isProfitable
                })}
              >
                {confirmOrderInfo?.pnlRoe}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm flex items-center justify-between">
              <h5 className="text-slate-500 ">Net Value</h5>
              <div className="dotted-underline">{confirmOrderInfo?.netValue}</div>
            </div>
          </div>
        </div>

        <div className="w-full h-1 bg-slate-800"></div>
        {/* <div>
          <div className="text-sm flex items-center justify-between">
            <h5 className="text-slate-500">Fee</h5>
            <div>$0.36</div>
          </div>
        </div> */}

        {/* <div className="flex items-center justify-between text-sm">
          <h5>You will receive</h5>
          <div className="dotted-underline cursor-pointer">0.0028 BTC</div>
        </div> */}
      </div>
    ) : (
      <div></div>
    )
  }, [chain, closeAmount, confirmOrderInfo])

  const footerModal = useMemo(() => {
    return (
      <div>
        <Button text="Close" onClick={handleCloseOrder} disabled={isClosingOrder} isLoading={isClosingOrder} />
      </div>
    )
  }, [handleCloseOrder, isClosingOrder])

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
            <div className="text-left">
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
            text="Close"
            isDefault={false}
            disabled={isClosingOrder}
            className="border px-2 py-1"
            onClick={() => handleConfirmOrder(cell)}
          />
        )
      }
    }
  ]

  return (
    <>
      <CLosingModal
        open={isCloseOrdered}
        setOpen={setIsCloseOrdered}
        header={headerModal}
        body={bodyModal}
        footer={footerModal}
        disabled={isClosingOrder}
      />
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
