import React, { useEffect, useMemo, useState, useCallback } from "react"

import { Position, OrderType, Side } from "@void-0x/void-sdk"
import { parseUnits } from "viem"
import { useAccount, useBalance, useContractRead } from "wagmi"

import { SelectCustom, InputCustom, SliderLeverage, SlippageCustom } from "@components/common"
import { LimitIcon, MarketIcon } from "@icons/index"
import CollateralModal from "@components/CollateralModal/CollateralModal"
import Button from "@components/Button/Button"
import SwitchButton from "@components/SwitchButton/SwitchButton"
import { BTC, CAKE, ETH } from "@img/token"
import InputWithToken from "@components/common/InputWithToken/InputWithToken"
import { FastPriceFeed } from "src/abis"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"
import useExchange from "src/hooks/useExchange"

import "./OrderBox.css"

const OrderBox = ({ type }) => {
  const [leverage, setLeverage] = useState(10)
  const [toggle, setToggle] = useState(false)
  const [payAmount, setPayAmount] = useState(localStorage.getItem("allowance") || "")
  const [orderType, setOrderType] = useState(OrderType.MARKET)
  const [collateralModal, setCollateralModal] = useState(false)
  const [tokenSelected, setTokenSelected] = useState("0xB232278f063AB63592FCc612B3bc01662b7245f0")

  console.log({ tokenSelected })
  const { isLoading: isExchangeLoading, placeOrder } = useExchange()

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: tokenSelected,
    watch: true
  })

  const { data: indexPrice } = useContractRead({
    address: "0xaD0d06353e7fCa52BD40441a45D5A623d9284C0C",
    abi: FastPriceFeed.abi,
    functionName: "getPrice",
    args: ["0xB232278f063AB63592FCc612B3bc01662b7245f0", true]
  })

  const { allowance, approve, isApproving } = useAllowance({
    token: tokenSelected,
    account: address,
    spender: "0x5e263c7014ab3ae324f113c9abef573f4e6c4dde",
    tokenDecimals: balance?.decimals || 0
  })

  const onApprove = React.useCallback(() => {
    approve(payAmount)
    localStorage.setItem("allowance", payAmount)
  }, [payAmount, approve])

  const onDebounceApprove = useDebounce(onApprove, 1000)

  const onChangeToggle = () => {
    setToggle(!toggle)
  }

  const changePayAmount = (amount) => {
    setPayAmount(amount)
  }
  const changeOrderType = (order) => {
    setOrderType(order)
  }

  const positionSize = useMemo(() => {
    if (payAmount && payAmount > 0 && payAmount !== "") {
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
      setToggle(false)
    }
  }, [collateralModal])
  useEffect(() => {
    setCollateralModal(toggle)
  }, [toggle])

  const onPlaceOrder = useCallback(async () => {
    await placeOrder({
      orderType: orderType,
      indexToken: tokenSelected,
      side: Side.LONG,
      isIncrease: true,
      price: indexPrice,
      purchaseToken: tokenSelected,
      purchaseAmount: parseUnits(payAmount?.toString(), balance?.decimals),
      leverage: Number(leverage)
    })
    setPayAmount("")
    localStorage.removeItem("allowance")
  }, [placeOrder, orderType, tokenSelected, indexPrice, payAmount, balance?.decimals, leverage])

  const renderButton = useCallback(() => {
    if (allowance >= payAmount) {
      return (
        <Button
          className="w-full"
          text="Place Order"
          onClick={onPlaceOrder}
          isLoading={isExchangeLoading}
          disabled={payAmount === "" || payAmount === 0 || isExchangeLoading}
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
  }, [allowance, payAmount, onDebounceApprove, isApproving, onPlaceOrder, isExchangeLoading])
  return (
    <>
      <CollateralModal openModal={collateralModal} setOpenModal={setCollateralModal} />
      <div className="order-box">
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
              placeHolder={"0.0"}
              classNameInput="px-1 py-2"
              disabled={orderType === "market"}
            />
          </div>
        </div>
        <div className="mt-3 2xl:mt-5 relative flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label>Pay</label>
            <SwitchButton onChange={onChangeToggle} value={toggle} />
          </div>

          <InputWithToken
            tokenOptions={[
              { label: "BTC", value: "0xB232278f063AB63592FCc612B3bc01662b7245f0", icon: BTC },
              { label: "ETH", value: "0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD", icon: ETH }
            ]}
            tokenValue={tokenSelected}
            onSelectToken={(token) => setTokenSelected(token)}
            onChangeInput={(val) => setPayAmount(val)}
            inputValue={payAmount}
          />
        </div>
        <div className="mt-3 2xl:mt-5">
          <InputCustom
            label="Position Size"
            allowSelectToken={true}
            tokenOptions={[
              { label: "BTC", value: "0x765C0c2D27A3EfB4064ed7f2E56e4F7CDDf4202f", icon: BTC },
              { label: "ETH", value: "0xe9782D26ABc19FF5174F77e84B0dD19D47635043", icon: ETH, disabled: true }
            ]}
            values={positionSize}
            defaultToken={"0x765C0c2D27A3EfB4064ed7f2E56e4F7CDDf4202f"}
            placeHolder={"0.0"}
            showBalance={true}
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
            <label>Collateral Asset</label>
            <div className="flex items-center gap-1">
              <img src={CAKE} className="rounded-full w-5 h-5" alt="icon" />
              <span>Cake</span>
            </div>
          </div>
          <div className="collateral-value flex justify-between mt-2 text-base lg:text-sm">
            <label>Collateral Value</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="collateral-leverage flex justify-between mt-2 text-base lg:text-sm">
            <label>Leverage</label>
            <div className="">
              <span>{leverage} x</span>
            </div>
          </div>
          <div className="entry-price flex justify-between mt-2 text-base lg:text-sm">
            <label>Entry Price</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="liquidation flex justify-between mt-2 text-base lg:text-sm">
            <label>Liquidation</label>
            <div className="">
              <span>-</span>
            </div>
          </div>
          <div className="w-full h-1 bg-slate-400 mt-3"></div>
          <div className="mt-3 2xl:mt-5">
            <title>Market Infor</title>
            <div className="borrow-fee mt-2 flex justify-between items-center text-base lg:text-sm">
              <label>Borrow Fee</label>
              <span>0.00086% per hour</span>
            </div>
            <div className="available-liquidity mt-2 flex justify-between items-center text-base lg:text-sm">
              <label className="">Available Liquidity</label>
              <span className="text-zinc-500">17,050 Cake ~ $57</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderBox
