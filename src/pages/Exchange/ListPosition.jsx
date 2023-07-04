import React, { useState, useEffect, useMemo, useCallback } from "react"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"

import { useAccount, useNetwork } from "wagmi"
import { Position, Constants, OrderType, Side } from "@void-0x/void-sdk"

import useTokenPriceFeed from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { AddressToSymbolMap, Tokens } from "src/lib/tokens"
import { formatValue, descaleValue, formatPercentage } from "src/lib/formatter"
import cx from "classnames"
import CLosingModal from "./CLosingModal"
import CollateralPopup from "./CollateralPopup"

const ListPosition = () => {
  const [isOpenedCollatoral, setIsOpenedCollatoral] = useState(false)
  const [collateralTab, setCollateralTab] = useState("add")
  const [positions, setPositions] = useState([])
  const [isCloseOrdered, setIsCloseOrdered] = useState(false)
  const [confirmInfo, setConfimInfo] = useState()
  const [changeCollateralInfo, setChangeCollaterallInfo] = useState()
  const [sizeAmount, setSizeAmmount] = useState()
  const [collateralAmount, setCollateralAmount] = useState()

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { getPositions, closeOrder, isClosingOrder, shouldRefreshPositions } = useExchangeContext()
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
  }, [getPositions, address, chain, shouldRefreshPositions])

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

      const liquidationPrice = formatValue(
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
      )
      const netValue = formatValue(
        Position.getNetValue(position, indexPrice, tokenDecimals),
        Constants.ORACLE_PRICE_DECIMALS
      )
      const collateralValue = formatValue(position.collateralValue, valueDecimals)

      const rawValue = {
        ...position,
        pnl,
        indexPrice,
        liquidationPrice: Position.getLiquidationPrice(
          position,
          BigInt(Constants.POSITION_FEE),
          /* global BigInt */
          // TODO: fetch current funding rate from exchange
          BigInt(0),
          indexPrice,
          BigInt(Constants.MIN_MARGIN_RATIO_BPS)
        ),
        netValue: Position.getNetValue(position, indexPrice, tokenDecimals),
        valueDecimals,
        collateralValue: position.collateralValue
      }

      return {
        raw: rawValue,
        market: `${token.name}/USD`,
        collateralValue,
        size: formatValue(position.size, valueDecimals),
        entryPrice: formatValue(position.entryPrice, Constants.ORACLE_PRICE_DECIMALS),
        leverage: Position.getLeverage(position) + "x",
        isProfitable: pnl > 0,
        indexPrice: formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS),
        pnlRoe: formatValue(pnl, Constants.ORACLE_PRICE_DECIMALS),
        type: position.isLong ? "long" : "short",
        token: symbol,
        netValue,
        liquidationPrice,
        icon: token.icon
      }
    })
    return formatteds
  }, [positions, prices, chain])
  console.log({ formattedPositions })
  const handleConfirmOrder = (cell) => {
    setSizeAmmount(cell?.raw?.size)
    setConfimInfo(cell)
    setIsCloseOrdered(true)
  }

  const handleCloseOrder = useCallback(async () => {
    const position = confirmInfo?.raw

    await closeOrder({
      orderType: OrderType.MARKET,
      indexToken: position.indexToken,
      size: sizeAmount,
      // TODO: dynamic collateral delta
      collateralDelta: sizeAmount == position.size ? position.collateralValue : BigInt(0),
      side: position.isLong ? Side.LONG : Side.SHORT,
      price: prices[position.indexToken]
    })

    if (!isClosingOrder) {
      setIsCloseOrdered(false)
      setConfimInfo()
      setSizeAmmount()
    }
  }, [closeOrder, confirmInfo?.raw, isClosingOrder, prices, sizeAmount])

  const calculatePosition = useCallback(
    (percent, field) => {
      switch (field) {
        case "size":
          const rawSizePosition = confirmInfo?.raw
          return (rawSizePosition?.size * BigInt(percent)) / BigInt(100)
        case "collateral":
          const rawCollateralPosition = changeCollateralInfo?.raw
          return (rawCollateralPosition?.collateralValue * BigInt(percent)) / BigInt(100)
        default:
          break
      }
    },
    [changeCollateralInfo, confirmInfo]
  )

  const handleConfirmCollateral = (cell) => {
    setChangeCollaterallInfo(cell)
    setIsOpenedCollatoral(true)
    setCollateralAmount(cell?.raw.collateralValue)
  }

  const headerConfirmModal = useMemo(() => {
    return confirmInfo ? (
      <div>
        <div className="flex gap-3">
          <div>Close {confirmInfo?.token} Position -</div>
          <div
            className={cx(
              { "green-up": confirmInfo?.type === "long", "red-down": confirmInfo?.type === "short" },
              "capitalize"
            )}
          >
            {confirmInfo?.type} {confirmInfo?.leverage}
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  }, [confirmInfo])

  const bodyConfirmModal = useMemo(() => {
    return confirmInfo ? (
      <div className="flex flex-col gap-5 ">
        <div className="grid grid-cols-2 gap-3">
          <div className="border py-2 px-2 rounded text-left ">
            <h5 className="text-slate-500 text-sm">Market Price</h5>
            <div className="text-sm">{confirmInfo?.indexPrice}</div>
          </div>
          <div className="border py-2 px-2 rounded text-left">
            <h5 className="text-slate-500 text-sm">Order Type</h5>
            <div className="text-sm">Market</div>
          </div>
        </div>
        <div className="border p-2 flex flex-col gap-3 rounded">
          <div className="flex justify-between">
            <h5 className="text-sm text-slate-500">Close Amount</h5>
            <div className="text-slate-500 text-sm">Max: {confirmInfo?.size}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">{formatValue(sizeAmount, confirmInfo?.raw?.valueDecimals)}</div>
            <div className="text-sm">{confirmInfo?.token}</div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-sm">
            {[25, 50, 75, 100].map((i, idx) => (
              <div
                className={cx("bg-slate-900 py-1 rounded cursor-pointer", {
                  active: sizeAmount === calculatePosition(i, "size")
                })}
                onClick={() => {
                  const amount = calculatePosition(i, "size")
                  setSizeAmmount(amount)
                }}
                key={idx}
              >
                {i} %
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="text-slate-500 text-sm">Profits In</h5>
          <div className="flex items-center gap-1">
            <img src={confirmInfo?.icon} className="w-4 h-4" alt="token" />
            <div className="text-sm">{confirmInfo?.token}</div>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-800"></div>
        <div className="flex flex-col gap-2">
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Entry & Index Price</h5>
            <div className="text-sm">{confirmInfo?.entryPrice}</div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Market</h5>
            <div className="text-sm">{confirmInfo?.market}</div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Size</h5>
            <div className="text-sm">
              <div className="">{confirmInfo?.size}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Leverage</h5>
            <div className="text-sm flex items-center gap-1">
              <div className="">{confirmInfo?.leverage}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Liq. Price</h5>
            <div className="text-sm">
              <div>{confirmInfo?.liquidationPrice}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Collateral</h5>
            <div className="text-sm">
              <div>{confirmInfo?.collateralValue}</div>
            </div>
          </div>
          <div className="flex text-sm items-center justify-between">
            <h5 className="text-slate-500">Pnl & Roe</h5>
            <div className="text-sm flex items-center gap-1">
              <div
                className={cx({
                  "green-up": confirmInfo?.isProfitable,
                  "red-down": !confirmInfo?.isProfitable
                })}
              >
                {confirmInfo?.pnlRoe}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm flex items-center justify-between">
              <h5 className="text-slate-500 ">Net Value</h5>
              <div className="dotted-underline">{confirmInfo?.netValue}</div>
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
  }, [calculatePosition, sizeAmount, confirmInfo])

  const footerConfirmModal = useMemo(() => {
    return (
      <div>
        <Button text="Close" onClick={handleCloseOrder} disabled={isClosingOrder} isLoading={isClosingOrder} />
      </div>
    )
  }, [handleCloseOrder, isClosingOrder])

  const headerCollateralModal = useMemo(() => {
    return changeCollateralInfo ? (
      <div className="collateral-header">
        <label className="font-medium">
          Change Collateral -{" "}
          <span
            className={cx({
              "red-down": changeCollateralInfo?.type === "short",
              "green-up": changeCollateralInfo?.type === "long"
            })}
          >
            {changeCollateralInfo?.type} {changeCollateralInfo?.token}
          </span>
        </label>
        <div className="colateral-tab font-medium mt-3 bg-slate-900">
          <button className={cx({ active: collateralTab === "add" })} onClick={() => setCollateralTab("add")}>
            Add
          </button>
          <button className={cx({ active: collateralTab === "remove" })} onClick={() => setCollateralTab("remove")}>
            Remove
          </button>
        </div>
      </div>
    ) : (
      <div></div>
    )
  }, [changeCollateralInfo, collateralTab])

  const bodyCollateralModal = useMemo(() => {
    return changeCollateralInfo ? (
      <div className="collateral-content mt-3">
        {/* input */}
        <div className="collateral-input p-3 flex flex-col gap-y-3 border">
          <div className="top flex justify-between">
            <label className="text-slate-500">Add</label>
            <div className="text-slate-500">Max: {changeCollateralInfo?.collateralValue}</div>
          </div>
          <div className="middle flex justify-between">
            <div>{formatValue(collateralAmount, changeCollateralInfo?.raw.valueDecimals)}</div>
            <div>{changeCollateralInfo?.token}</div>
          </div>
          <div className="bottom flex justify-between gap-3">
            {[25, 50, 75, 100].map((c, idx) => (
              <button
                className={cx({
                  "bg-slate-800 w-1/4 py-1": true,
                  active: collateralAmount === calculatePosition(c, "collateral")
                })}
                key={idx}
                onClick={() => {
                  const collateral = calculatePosition(c, "collateral")
                  setCollateralAmount(collateral)
                }}
              >
                {c} %
              </button>
            ))}
          </div>
        </div>
        {/* infor */}
        <div className="collateral-infor mt-3 flex flex-col gap-y-2">
          <div className="flex justify-between">
            <label className="text-slate-500">Position Size</label>
            <span className="">{changeCollateralInfo?.size}</span>
          </div>
          <div className="flex justify-between">
            <label className="text-slate-500">Collateral</label>
            <span className="">{changeCollateralInfo?.collateralValue}</span>
          </div>
          <div className="flex justify-between">
            <label className="text-slate-500">Leverage</label>
            <span className="">{changeCollateralInfo?.leverage}</span>
          </div>
          <div className="flex justify-between">
            <label className="text-slate-500">Index Price</label>
            <label>{changeCollateralInfo?.indexPrice}</label>
          </div>
          <div className="flex justify-between">
            <label className="text-slate-500">Liq.Price</label>
            <span className="">{changeCollateralInfo?.liquidationPrice}</span>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  }, [changeCollateralInfo, collateralAmount, calculatePosition])

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
                {cell?.type === "long" ? "Long" : "Short"} {cell?.leverage}
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
            <Button
              text="+"
              className="px-2 border inline-block"
              isDefault={false}
              onClick={() => handleConfirmCollateral(cell)}
            />
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
        const rawValue = cell?.raw
        const descaledPnl = descaleValue(rawValue.pnl, Constants.ORACLE_PRICE_DECIMALS)
        const descaledCollateralValue = descaleValue(rawValue.collateralValue, rawValue.valueDecimals)
        const percentPNL = (parseFloat(descaledPnl) / parseFloat(descaledCollateralValue)) * 100

        return (
          <div className="flex flex-col gap-1">
            <h3 className={cx(cell.isProfitable ? "green-up" : "red-down")}>{cell?.pnlRoe}</h3>
            <div className="text-slate-500 font-medium">{formatPercentage(percentPNL) || 0}</div>
          </div>
        )
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
        header={headerConfirmModal}
        body={bodyConfirmModal}
        footer={footerConfirmModal}
        disabled={isClosingOrder}
      />
      <CollateralPopup
        open={isOpenedCollatoral}
        setOpen={setIsOpenedCollatoral}
        collateralTab={collateralTab}
        setCollateralTab={setCollateralTab}
        header={headerCollateralModal}
        body={bodyCollateralModal}
        footer={
          <div className="collateral-footer mt-3">
            {collateralTab === "add" ? <Button text="Add Collateral" /> : <Button text="Remove Collateral" />}
          </div>
        }
      />
      <TableCustom columnDef={columnDef} data={formattedPositions} cellStyle="p-3 text-xs" />
    </>
  )
}

export default ListPosition
