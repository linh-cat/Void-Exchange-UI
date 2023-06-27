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

import { CAKE, USDC } from "@img/token"
import InputWithToken from "@components/common/InputWithToken/InputWithToken"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"
import useTokenPriceFeed from "src/hooks/useTokenPriceFeed"
import { useExchangeContext } from "src/contexts/ExchangeContext"
import { formatValue } from "src/lib/formatter"

const ShortOrderBox = () => {
  const [leverage, setLeverage] = useState(10)
  const [toggle, setToggle] = useState(false)
  const [payAmount, setPayAmount] = useState("")
  const [orderType, setOrderType] = useState(OrderType.MARKET)
  const [collateralModal, setCollateralModal] = useState(false)
  const { chain } = useNetwork()
  const { indexToken, placeOrder, isPlacingOrder } = useExchangeContext()
  const [selectedToken, setSelectedToken] = useState()

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    staleTime: 2_000,
    watch: true
  })

  const { prices } = useTokenPriceFeed([indexToken, selectedToken])

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
    setToggle(!toggle)
  }

  const changeOrderType = (order) => {
    setOrderType(order)
  }

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

  const onPlaceOrder = useCallback(async () => {
    await placeOrder({
      orderType: orderType,
      indexToken,
      side: Side.SHORT,
      isIncrease: true,
      price: prices[indexToken],
      purchaseToken: selectedToken,
      purchaseAmount: parseUnits(payAmount?.toString(), balance?.decimals),
      leverage: Number(leverage)
    })

    setPayAmount("")
  }, [placeOrder, orderType, prices, indexToken, selectedToken, payAmount, balance?.decimals, leverage])

  const renderButton = useCallback(() => {
    if (+allowance >= +payAmount) {
      return (
        <Button
          className="w-full"
          text="Place Order"
          onClick={onPlaceOrder}
          isLoading={isPlacingOrder}
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
  }, [allowance, payAmount, onDebounceApprove, isApproving, onPlaceOrder, isPlacingOrder])

  return (
    <>
      <CollateralModal openModal={collateralModal} setOpenModal={setCollateralModal} />
      <div className="order-box vh-80 overflow-y-scroll no-scrollbar">
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
        <div className="mt-3 2xl:mt-5 relative flex flex-col gap-1">
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
        <div className="mt-3 2xl:mt-5">
          <InputCustom
            label="Position Size"
            allowSelectToken={false}
            // tokenOptions={[
            //   { label: "BTC", value: Constants.Addresses[chain?.id]?.IndexTokens?.WBTC, icon: BTC },
            //   {
            //     label: "ETH",
            //     value: Constants.Addresses[chain?.id]?.IndexTokens?.WETH,
            //     icon: ETH,
            //     disabled: true
            //   }
            // ]}
            classNameInput="pl-1 py-4"
            value={positionSize}
            // defaultToken={Constants.Addresses[chain?.id]?.IndexTokens?.WBTC}
            placeHolder={"0.0"}
            showBalance={false}
            showUsd={true}
            disabled={true}
          />
        </div>
        <div className="mt-3 2xl:mt-5">
          <SliderLeverage
            label="Leverage"
            defaultValue={20}
            onChangeLeverage={(amount) => setLeverage(amount)}
            value={leverage}
          />
        </div>
        <div className="mt-10 w-full">{renderButton()}</div>
        <div className="mt-3 2xl:mt-5">
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
        <div className="mt-3 2xl:mt-5">
          <div className="collateral-asset flex justify-between text-base lg:text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Asset</label>
            <div className="flex items-center gap-1">
              <img src={CAKE} className="rounded-full w-5 h-5" alt="icon" />
              <span>Cake</span>
            </div>
          </div>
          <div className="collateral-value flex justify-between mt-2 text-base lg:text-sm">
            <label className="text-slate-500 dotted-underline">Collateral Value</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="collateral-leverage flex justify-between mt-2 text-base lg:text-sm">
            <label className="text-slate-500 dotted-underline">Leverage</label>
            <div className="">
              <span>{leverage} x</span>
            </div>
          </div>
          <div className="entry-price flex justify-between mt-2 text-base lg:text-sm">
            <label className="text-slate-500 dotted-underline">Entry Price</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="liquidation flex justify-between mt-2 text-base lg:text-sm">
            <label className="text-slate-500 dotted-underline">Liquidation</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="">
            <title>Market Infor</title>
            <div className="borrow-fee mt-2 flex justify-between items-center text-base lg:text-sm">
              <label className="text-slate-500 dotted-underline">Borrow Fee</label>
              <span>0.00086% per hour</span>
            </div>
            <div className="available-liquidity mt-2 flex justify-between items-center text-base lg:text-sm">
              <label className="text-slate-500 dotted-underline">Available Liquidity</label>
              <span>17,050 Cake ~ $57</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShortOrderBox