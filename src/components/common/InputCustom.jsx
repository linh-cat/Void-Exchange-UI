import React, { useEffect, useState } from "react"
import { useAccount, useBalance } from "wagmi"
import cx from "classnames"

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"

import SelectToken from "./SelectToken"

import "./InputCustom.css"

const decimalCount = (numb) => {
  const converted = numb.toString()
  if (converted.includes(".")) {
    return converted.split(".")[1].length
  }
  return ""
}

const InputCustom = ({
  label,
  tooltip,
  leftSide,
  placeHolder,
  className,
  showBalance,
  rightAction,
  classNameInput,
  showMaxBtn,
  showUsd,
  onChange,
  value,
  type,
  min,
  max,
  isBorder = true,
  allowSelectToken,
  tokenOptions,
  defaultToken,
  headerAction,
  disabled,
  getTokenAsset
}) => {
  const [selectedToken, setSelectedToken] = useState(defaultToken)

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    watch: true,
    staleTime: 2_000
  })

  const onChangeToken = (token) => {
    setSelectedToken(token)
  }

  useEffect(() => {
    if (getTokenAsset) getTokenAsset(selectedToken)
  }, [getTokenAsset, selectedToken])

  const handleChange = (val) => {
    if (type === "number") {
      if (Number(val) < 0 || Number(val) === 0) {
        return onChange("")
      }

      if (val < min) {
        return onChange(min)
      }

      if (val > max) {
        return onChange(max)
      }

      if (decimalCount(val) > 8) {
        val = Number(val).toFixed(8).toString()
      }

      if (showBalance) {
        if (Number(val) > Number(balance?.formatted)) {
          return onChange(balance?.formatted)
        }
      }
      return onChange(val)
    }
    onChange(val)
  }

  return (
    <div
      className={cx({
        "input-custom flex flex-col w-full h-full": true,
        className: className,
        "gap-y-1": label
      })}
    >
      <div className="title flex items-center gap-x-1">
        <label className="text-sm text-slate-500">{label}</label>
        {label && (
          <div className="group-tooltip">
            <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
            <div className="tooltip p-3 rounded">{tooltip}</div>
          </div>
        )}
        {headerAction}
        {/* {showUsd && values && (
          <div
            className="text-xs 
           text-slate-500 usd"
          >
            ~$27.000
          </div>
        )} */}
      </div>
      <div
        className={cx({
          "flex h-full items-center rounded pl-1 pr-1": true,
          border: isBorder
        })}
      >
        {leftSide && <div className="left-action">{leftSide}</div>}
        <input
          className={cx(
            {
              "rounded w-full h-full text-xs lg:text-sm": true,
              disabled: disabled
            },
            classNameInput
          )}
          placeholder={placeHolder}
          onChange={(e) => handleChange(Number(e.target.value))}
          value={value}
          type={type || "number"}
          min={min}
          max={max}
        />
        {showMaxBtn && (
          <label
            className="cursor-pointer border rounded px-1 py-1 text-xs bg-dropdown"
            onClick={() => handleChange(balance?.formatted)}
          >
            Max
          </label>
        )}
        {allowSelectToken && (
          <div className="border ml-1 py-1 rounded">
            <SelectToken options={tokenOptions} onChange={(token) => onChangeToken(token)} values={selectedToken} />
          </div>
        )}
        {rightAction}
      </div>

      {showBalance && (
        <label className="text-xs lg:text-sm text-slate-500 balance">
          {balance?.formatted} {balance?.symbol}
        </label>
      )}
    </div>
  )
}

export default InputCustom
