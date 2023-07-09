import React, { useEffect, useMemo, useState, useCallback } from "react"

import { Position, OrderType, Side } from "@void-0x/void-sdk"
import { parseUnits } from "viem"
import { useAccount, useBalance, useNetwork } from "wagmi"

import { SelectCustom, InputCustom, SliderLeverage, SlippageCustom } from "@components/common"
import { LimitIcon, MarketIcon } from "@icons/index"
import CollateralModal from "@components/CollateralModal/CollateralModal"
import Button from "@components/Button/Button"
import SwitchButton from "@components/SwitchButton/SwitchButton"
import { Constants } from "@void-0x/void-sdk"

import { BTC, ETH, USDC } from "@img/token"
import InputWithToken from "@components/common/InputWithToken/InputWithToken"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"
import useTokenPriceFeed, { useTokenPrice } from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { formatDollar, formatValue } from "src/lib/formatter"
import PlaceOrderModal from "./PlaceOrderModal"
import TransactionPopup from "@components/common/TransactionPopup/TransactionPopup"
import NoticePopup from "@components/common/NoticePopup/NoticePopup"
import Badge from "@components/common/Badge"
import useLocalStorage from "src/hooks/useLocalStorage"
import { getCollateralValue } from "src/lib/utils"

const ShortOrderBox = () => {
  const [collateralModal, setCollateralModal] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [orderConfirmModal, setOrderConfirmModal] = useState(false)

  const [selectedToken, setSelectedToken] = useState()
  const [payAmount, setPayAmount] = useState("")
  const [leverage, setLeverage] = useState(10)
  const [orderType, setOrderType] = useState(OrderType.MARKET)

  const { indexToken, placeOrder, isPlacingOrder, executePopup, shouldShowPlaceOrderPopup } = useExchangeContext()
  const [getLocal, setLocal, removeLocal] = useLocalStorage("orderinfor.short")
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    staleTime: 2_000,
    watch: true
  })

  const { prices } = useTokenPriceFeed([indexToken, selectedToken])
  const indexPrice = useTokenPrice(indexToken)

  const { allowance, approve, isApproving } = useAllowance({
    token: selectedToken,
    account: address,
    spender: Constants.Addresses[chain?.id]?.Exchange,
    tokenDecimals: balance?.decimals || 0
  })

  const positionSize = useMemo(() => {
    if (payAmount) {
      return Position.getPositionSizeInUsd(
        parseUnits(payAmount?.toString(), balance?.decimals),
        prices[selectedToken],
        Number(leverage),
        balance?.decimals
      )
    }
    return 0
  }, [balance, selectedToken, prices, leverage, payAmount])

  const collateralValue = useMemo(() => {
    const value = getCollateralValue(parseUnits(payAmount?.toString(), balance?.decimals), indexPrice)
    const tokenDecimals = Constants.Addresses[chain?.id]?.TokenDecimals?.[selectedToken]
    const valueDecimals = tokenDecimals + Constants.ORACLE_PRICE_DECIMALS

    const destinationValue = value ? formatValue(value, valueDecimals) : "0.0"
    return destinationValue
  }, [balance?.decimals, chain?.id, indexPrice, payAmount, selectedToken])

  const collateralInfo = useMemo(() => {
    if (chain) {
      return {
        [Constants.Addresses[chain.id]?.IndexTokens?.WBTC]: {
          src: BTC,
          label: "BTC"
        },
        [Constants.Addresses[chain.id]?.IndexTokens?.WETH]: {
          src: ETH,
          label: "ETH"
        },
        [Constants.Addresses[chain.id]?.StableCoins?.USDC]: {
          src: USDC,
          label: "USDC"
        }
      }
    }
    return {}
  }, [chain])

  const tokenOptions = useMemo(() => {
    return [{ label: "USDC", value: Constants.Addresses[chain?.id]?.StableCoins?.USDC, icon: USDC }]
  }, [chain])

  const onApprove = React.useCallback(() => {
    approve(payAmount)
  }, [payAmount, approve])

  const onDebounceApprove = useDebounce(onApprove, 1000)

  const onChangeToggle = () => {
    setToggle(!toggle)
  }

  const changeOrderType = (order) => {
    setOrderType(order)
  }

  useEffect(() => {
    if (!collateralModal) {
      setToggle(false)
    }
  }, [collateralModal])

  useEffect(() => {
    setCollateralModal(toggle)
  }, [toggle])

  useEffect(() => {
    setSelectedToken(Constants.Addresses[chain?.id]?.StableCoins?.USDC)
  }, [chain?.id])

  const handleConfirmOrder = useCallback(() => {
    const purchaseInfo = tokenOptions.find((t) => t.value === selectedToken)

    setLocal({
      orderType: "Market",
      indexPrice: indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS) : 0,
      payAmount: payAmount,
      purchaseIcon: purchaseInfo?.icon,
      purchaseLabel: purchaseInfo?.label,
      leverage: leverage,
      positionSize: positionSize
    })

    setOrderConfirmModal(true)
  }, [indexPrice, leverage, payAmount, positionSize, selectedToken, setLocal, tokenOptions])

  const onPlaceOrder = useCallback(async () => {
    await placeOrder({
      orderType: orderType,
      indexToken,
      side: Side.SHORT,
      isIncrease: true,
      price: prices[selectedToken],
      purchaseToken: selectedToken,
      purchaseAmount: parseUnits(payAmount?.toString(), balance?.decimals),
      leverage: Number(leverage)
    })
    setPayAmount("")
    if (!isPlacingOrder) {
      setOrderConfirmModal(false)
      removeLocal()
    }
  }, [
    placeOrder,
    orderType,
    indexToken,
    prices,
    selectedToken,
    payAmount,
    balance?.decimals,
    leverage,
    isPlacingOrder,
    removeLocal
  ])

  const renderButton = useCallback(() => {
    if (payAmount === "") {
      return <Button text="Enter amount" className="w-full bg-red py-2 cursor-not-allowed" isDefault={false} />
    }
    if (+allowance >= +payAmount) {
      return (
        <Button
          className="w-full bg-red py-2 cursor-pointer"
          text="Short"
          onClick={handleConfirmOrder}
          disabled={payAmount === "" || payAmount === 0 || isPlacingOrder}
          isDefault={false}
        />
      )
    }

    return (
      <Button
        className="w-full"
        text="Approve"
        onClick={onDebounceApprove}
        isLoading={isApproving}
        disabled={isApproving}
      />
    )
  }, [payAmount, allowance, onDebounceApprove, isApproving, handleConfirmOrder, isPlacingOrder])

  const showHeaderConfirmOrder = useMemo(() => {
    const orderInfo = getLocal()
    return (
      <div className="flex items-center gap-1">
        <h2>Confirm Make Order -</h2>
        <div className="text-error">Short {orderInfo?.leverage}x</div>
      </div>
    )
  }, [getLocal])

  const showBodyConfirmOrder = useMemo(() => {
    const orderInfo = getLocal()

    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="border py-2 px-2 rounded text-left ">
            <h5 className="text-slate-500 text-sm">Market Price</h5>
            <div className="text-sm">{orderInfo?.indexPrice}</div>
          </div>
          <div className="border py-2 px-2 rounded text-left">
            <h5 className="text-slate-500 text-sm">Order Type</h5>
            <div className="text-sm">Market</div>
          </div>
        </div>
        <div className="border p-2 rounded">
          <h3 className="text-sm text-slate-500 text-left">Pay Amount</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span>{payAmount} </span>
            </div>
            <div className="flex items-center gap-1">
              <img src={orderInfo?.purchaseIcon} alt="token" className="w-4 h-4" />{" "}
              <span className="text-sm">{orderInfo?.purchaseLabel}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-800"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <h3 className=" text-slate-500 dotted-underline">Leverage</h3>
            <div>{orderInfo?.leverage}x</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <h3 className="text-slate-500 dotted-underline">Position</h3>
            <div>{orderInfo?.positionSize}</div>
          </div>
        </div>
      </div>
    )
  }, [getLocal, payAmount])

  const showFooterConfirmOrder = useMemo(() => {
    return (
      <Button
        text="Place Order"
        onClick={onPlaceOrder}
        isLoading={isPlacingOrder}
        disabled={isPlacingOrder}
        isDefault={false}
        className="bg-red py-2 cursor-pointer"
      />
    )
  }, [isPlacingOrder, onPlaceOrder])

  const showBodyPlaceOrderSuccess = useMemo(() => {
    const indexInfo = collateralInfo[indexToken]?.src
    return (
      <>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={indexInfo} alt="token" className="w-6 h-6" />

            <div className="flex items-center gap-2">
              <div className="text-sm font-bold">Place Order</div>
              <Badge text="Short" type="short" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-slate-500">Type</div>
          <div className="text-slate-500">Market</div>
        </div>
        <div className="flex justify-between">
          <div className="text-slate-500">Price</div>
          <div>{indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS) : 0}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-slate-500">Leverage</div>
          <div>{leverage}x</div>
        </div>
      </>
    )
  }, [indexPrice, indexToken, collateralInfo, leverage])

  return (
    <>
      <PlaceOrderModal
        open={orderConfirmModal}
        setOpen={setOrderConfirmModal}
        header={showHeaderConfirmOrder}
        body={showBodyConfirmOrder}
        footer={showFooterConfirmOrder}
        disabled={isPlacingOrder}
      />
      <CollateralModal openModal={collateralModal} setOpenModal={setCollateralModal} />
      {shouldShowPlaceOrderPopup && (
        <NoticePopup body={showBodyPlaceOrderSuccess} position="bottom-right" type="success" />
      )}
      {executePopup?.enable && executePopup.type === "open" && (
        <TransactionPopup
          body={
            <div className="p-3">
              <h3 className="text-base">Order Executed</h3>
              <p className="text-slate-500 text-sm mt-2">You have success the transaction</p>
            </div>
          }
          position="bottom-right"
          // onClose={closePopup}
          duration={3000}
          isCancelIcon={true}
        />
      )}
      <div className="order-box overflow-y-auto no-scrollbar flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <SelectCustom
              label="Order Type"
              options={[
                { label: "Limit", value: OrderType.LIMIT, icon: LimitIcon, disabled: true },
                { label: "Market", value: OrderType.MARKET, icon: MarketIcon }
              ]}
              defaultValue="market"
              values={orderType}
              classNameInput="pr-2"
              onChange={changeOrderType}
            />
          </div>
          <div className="">
            <InputCustom
              label="Price"
              placeHolder={
                prices[indexToken] ? formatValue(prices[indexToken], Constants.ORACLE_PRICE_DECIMALS) : "0.0"
              }
              classNameInput="px-1 py-2"
              disabled={orderType === OrderType.MARKET}
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-500">Pay</label>
            <SwitchButton onChange={onChangeToggle} value={toggle} />
          </div>

          <InputWithToken
            tokenOptions={[{ label: "USDC", value: Constants.Addresses[chain?.id]?.StableCoins?.USDC, icon: USDC }]}
            token={selectedToken}
            onSelectToken={(token) => {
              setSelectedToken(token)
            }}
            onChangeInput={(val) => setPayAmount(val)}
            inputValue={payAmount}
            disabled={isApproving || isPlacingOrder}
          />
        </div>
        <div className="border px-2 pt-2 pb-7">
          <SliderLeverage
            label="Leverage"
            defaultValue={20}
            onChangeLeverage={(amount) => setLeverage(amount)}
            value={leverage}
          />
        </div>
        <div className="mt-5 w-full">{renderButton()}</div>
        <div className="mt-3">
          <SlippageCustom
            label="Slippage"
            options={[
              { label: "0.1", value: 0.1 },
              { label: "0.2", value: 0.2 },
              { label: "0.3", value: 0.3 }
            ]}
            defaultValue={0.1}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="entry-price flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Entry Price</label>
            <div className="">
              <span>
                {prices[indexToken] ? formatValue(prices[indexToken], Constants.ORACLE_PRICE_DECIMALS) : "0.0"}
              </span>
            </div>
          </div>
          <div className="collateral-asset flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Asset</label>
            {collateralInfo[selectedToken] ? (
              <div className="flex items-center gap-1">
                <img src={collateralInfo[selectedToken]?.src} className="rounded-full w-5 h-5" alt="icon" />
                <span>{collateralInfo[selectedToken]?.label}</span>
              </div>
            ) : (
              "-"
            )}
          </div>
          <div className="collateral-value flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Value</label>
            <span>{collateralValue}</span>
          </div>
          <div className="collateral-value flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Position Size</label>
            <div className="">{positionSize > 0 ? formatDollar(positionSize) : "-"}</div>
          </div>
          <div className="collateral-leverage flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Leverage</label>
            <div className="">
              <span>{leverage} x</span>
            </div>
          </div>

          <div className="liquidation flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Liq.Price</label>
            <span>-</span>
          </div>
          {/* <div className="borrow-fee flex justify-between items-center text-sm">
            <label className="text-slate-500 dotted-underline">Borrow Fee</label>
            <span>0.00086% per hour</span>
          </div>
          <div className="available-liquidity flex justify-between items-center text-sm">
            <label className="text-slate-500 dotted-underline">Available Liquidity</label>
            <span>17,050 Cake ~ $57</span>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ShortOrderBox
