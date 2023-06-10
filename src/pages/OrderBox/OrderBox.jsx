import React, { useEffect, useMemo, useState } from "react"

import { Position } from "@void-0x/void-sdk"
import { parseUnits } from "viem"
import { useAccount, useBalance, useContractRead } from "wagmi"

import { SelectCustom, InputCustom, SliderLeverage, SlippageCustom } from "@components/common"
import { LimitIcon, MarketIcon } from "@icons/index"
import CollateralModal from "@components/CollateralModal/CollateralModal"
import Button from "@components/Button/Button"
import SwitchButton from "@components/SwitchButton/SwitchButton"
import { BTC, CAKE, ETH } from "@img/token"
import { FastPriceFeed } from "src/abis"
import useAllowance from "src/hooks/useAllowance"
import useDebounce from "src/hooks/useDebounce"

import "./OrderBox.css"

const OrderBox = ({ type }) => {
  const [leverage, setLeverage] = useState(10)
  const [toggle, setToggle] = useState(false)
  const [payAmount, setPayAmount] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [collateralModal, setCollateralModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState("0xB232278f063AB63592FCc612B3bc01662b7245f0")

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    watch: true
  })

  const { data: indexPrice } = useContractRead({
    address: "0xaD0d06353e7fCa52BD40441a45D5A623d9284C0C",
    abi: FastPriceFeed.abi,
    functionName: "getPrice",
    args: ["0xB232278f063AB63592FCc612B3bc01662b7245f0", true]
  })

  const { allowance, approve, isApproving } = useAllowance({
    token: selectedToken,
    account: address,
    spender: "0x5e263c7014ab3ae324f113c9abef573f4e6c4dde",
    tokenDecimals: balance?.decimals || 0
  })

  const onApprove = React.useCallback(() => {
    approve(payAmount)
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
    return Position.getPositionSizeInUsd(
      parseUnits(payAmount?.toString(), balance?.decimals),
      indexPrice,
      Number(leverage),
      balance?.decimals
    )
  }, [balance, indexPrice, leverage, payAmount])

  const getTokenAsset = (token) => {
    setSelectedToken(token)
  }

  useEffect(() => {
    if (!collateralModal) {
      setToggle(false)
    }
  }, [collateralModal])
  useEffect(() => {
    setCollateralModal(toggle)
  }, [toggle])

  return (
    <>
      <CollateralModal openModal={collateralModal} setOpenModal={setCollateralModal} />
      <div className="order-box">
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <SelectCustom
              label="Order Type"
              options={[
                { label: "Limit", value: "limit", icon: LimitIcon, disabled: true },
                { label: "Market", value: "market", icon: MarketIcon }
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
              getTokenAsset={getTokenAsset}
            />
          </div>
        </div>
        <div className="mt-3 2xl:mt-5 relative">
          <InputCustom
            label="Pay"
            headerAction={<SwitchButton onChange={onChangeToggle} value={toggle} />}
            onChange={changePayAmount}
            allowSelectToken={true}
            tokenOptions={[
              { label: "BTC", value: "0xB232278f063AB63592FCc612B3bc01662b7245f0", icon: BTC },
              { label: "ETH", value: "0x1C9DC6C4c37E9D5A71386104fDE19b2511877acD", icon: ETH, disabled: true }
            ]}
            defaultToken={"0xB232278f063AB63592FCc612B3bc01662b7245f0"}
            getTokenAsset={getTokenAsset}
            showMaxBtn={true}
            placeHolder={"0.0"}
            showBalance={true}
            showUsd={true}
            values={payAmount}
            type="number"
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
        <div className="mt-10 w-full">
          <Button
            className="w-full"
            text="Approve"
            onClick={onDebounceApprove}
            isLoading={isApproving}
            disabled={payAmount === "" || isApproving}
          />
        </div>
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
