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

import { BTC, CAKE, ETH } from "@img/token"
import InputWithToken from "@components/common/InputWithToken/InputWithToken"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"
import { useTokenPrice } from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { formatValue } from "src/lib/formatter"
import NoticePopup from "@components/common/NoticePopup/NoticePopup"
import Badge from "@components/common/Badge"
import TextWithTooltip from "@components/TextWithTooltip/TextWithTooltip"
import PlaceOrderModal from "./PlaceOrderModal"
import TransactionPopup from "@components/common/TransactionPopup/TransactionPopup"
import useLocalStorage from "src/hooks/useLocalStorage"

const LongOrderBox = () => {
  // UI state
  const [isToggled, setIsToggled] = useState(false)
  const [collateralModal, setCollateralModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState()
  const [orderConfirmModal, setOrderConfirmModal] = useState(false)

  // Order state
  const [payAmount, setPayAmount] = useState("")
  const [leverage, setLeverage] = useState(10)
  const [orderType, setOrderType] = useState(OrderType.MARKET)

  const { chain } = useNetwork()
  const { address } = useAccount()
  const { indexToken, placeOrder, isPlacingOrder, shouldShowPopupExecute, shouldShowPlaceOrderPopup } =
    useExchangeContext()

  const [getLocal, setLocal, removeLocal] = useLocalStorage("orderinfor.long")

  const tokenOptions = useMemo(() => {
    return [
      { label: "BTC", value: Constants.Addresses[chain?.id]?.IndexTokens?.WBTC, icon: BTC },
      { label: "ETH", value: Constants.Addresses[chain?.id]?.IndexTokens?.WETH, icon: ETH }
    ]
  }, [chain])

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
        }
      }
    }
    return {}
  }, [chain])

  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    watch: true,
    staleTime: 2_000
  })

  const indexPrice = useTokenPrice(indexToken)

  const { allowance, approve, isApproving } = useAllowance({
    token: selectedToken,
    account: address,
    spender: Constants.Addresses[chain?.id]?.Exchange,
    tokenDecimals: balance?.decimals || 0
  })

  const onApprove = React.useCallback(() => {
    approve(payAmount)
  }, [payAmount, approve])

  const onDebounceApprove = useDebounce(onApprove, 1000)

  const onChangeToggle = () => {
    setIsToggled(!isToggled)
  }

  const changeOrderType = (order) => {
    setOrderType(order)
  }

  const positionSize = useMemo(() => {
    if (payAmount) {
      return Position.getPositionSizeInUsd(
        parseUnits(payAmount?.toString(), balance?.decimals),
        indexPrice,
        Number(leverage),
        balance?.decimals
      )
    }
    return 0
  }, [balance, indexPrice, leverage, payAmount])

  useEffect(() => {
    if (!collateralModal) {
      setIsToggled(false)
    }
  }, [collateralModal])

  useEffect(() => {
    setCollateralModal(isToggled)
  }, [isToggled])

  useEffect(() => {
    if (indexToken) setSelectedToken(indexToken)
  }, [indexToken])

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
      indexToken: indexToken,
      side: Side.LONG,
      isIncrease: true,
      price: indexPrice,
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
    indexPrice,
    selectedToken,
    payAmount,
    balance?.decimals,
    leverage,
    isPlacingOrder,
    removeLocal
  ])

  const renderButton = useCallback(() => {
    if (payAmount === "") {
      return <Button text="Enter amount" className="cursor-not-allowed bg-green py-2" isDefault={false} />
    }
    if (+allowance >= +payAmount) {
      return (
        <Button
          className="w-full bg-green py-2 cursor-pointer"
          text="Long"
          onClick={handleConfirmOrder}
          isDefault={false}
          disabled={payAmount === "" || payAmount === 0 || isPlacingOrder}
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
    return (
      <div className="flex items-center gap-1">
        <h2>Confirm Make Order -</h2>
        <div className="green-up">Long {leverage}x</div>
      </div>
    )
  }, [leverage])

  const showBodyConfirmOrder = useMemo(() => {
    const orderInfo = getLocal()
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="border py-2 px-2 rounded text-left">
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
        isDefault={false}
        disabled={isPlacingOrder}
        className="cursor-pointer bg-green py-2"
      />
    )
  }, [isPlacingOrder, onPlaceOrder])

  const showBodyPlaceOrder = useMemo(() => {
    const info = tokenOptions.find((i) => i.value === indexToken)
    return (
      <>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={info?.icon} alt="token" className="w-6 h-6" />

            <div className="flex items-center gap-2">
              <div className="text-sm font-bold">Place Order</div>
              <Badge text="Long" type="long" />
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
  }, [indexPrice, indexToken, leverage, tokenOptions])

  return (
    <>
      {shouldShowPlaceOrderPopup && <NoticePopup body={showBodyPlaceOrder} duration={5000} position="bottom-right" />}
      {shouldShowPopupExecute && (
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
      <PlaceOrderModal
        open={orderConfirmModal}
        setOpen={setOrderConfirmModal}
        header={showHeaderConfirmOrder}
        body={showBodyConfirmOrder}
        footer={showFooterConfirmOrder}
        disabled={isPlacingOrder}
      />
      <CollateralModal openModal={collateralModal} setOpenModal={setCollateralModal} />
      <div className="order-box flex flex-col gap-3">
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
              placeHolder={indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS) : "0.0"}
              classNameInput="px-1 py-2"
              disabled={orderType === OrderType.MARKET}
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-500">Pay</label>
            <SwitchButton onChange={onChangeToggle} value={isToggled} />
          </div>

          <InputWithToken
            tokenOptions={tokenOptions}
            token={selectedToken}
            onSelectToken={(token) => {
              setSelectedToken(token)
            }}
            onChangeInput={(val) => setPayAmount(val)}
            inputValue={payAmount}
            disabled={isApproving || isPlacingOrder}
          />
        </div>
        <div className="border rounded px-2 pt-2 pb-7">
          <SliderLeverage
            label="Leverage"
            defaultValue={20}
            onChangeLeverage={(amount) => setLeverage(amount)}
            value={leverage}
          />
        </div>
        <div className="w-full mt-5">{renderButton()}</div>
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
            <span>{indexPrice ? formatValue(indexPrice, Constants.ORACLE_PRICE_DECIMALS) : "0.0"}</span>
          </div>
          <div className="collateral-asset flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Asset</label>
            <div className="flex items-center gap-1">
              <img src={collateralInfo[indexToken]?.src} className="rounded-full w-5 h-5" alt="icon" />
              <span>{collateralInfo[indexToken]?.label}</span>
            </div>
          </div>
          <div className="collateral-value flex justify-between text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Value</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-slate-500 dotted-underline">Position</h3>
            <div className="text-sm">{positionSize}</div>
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
        </div>
      </div>
    </>
  )
}

export default LongOrderBox
