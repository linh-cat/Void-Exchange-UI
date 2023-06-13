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
  return 0
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
  values,
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
  const DECIMAL_REGEX = RegExp("^[0-9]*[.]{1}[0-9]*$")
  const [selectedToken, setSelectedToken] = useState(defaultToken)

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address: address,
    token: selectedToken,
    watch: true
  })

  const onChangeToken = (token) => {
    setSelectedToken(token)
  }

  useEffect(() => {
    if (getTokenAsset) getTokenAsset(selectedToken)
  }, [getTokenAsset, selectedToken])

  const handleChange = (val) => {
    if (type === "number") {
      if (isNaN(Number(val))) {
        return onChange("0")
      }

      if (Number(val) < 0) {
        return onChange("0")
      }

      if (Number(val) !== 0) {
        // if it is integer, remove leading zeros
        if (!DECIMAL_REGEX.test(val)) {
          val = Number(val).toString()
        }
      }

      if (decimalCount(val) > 8) {
        val = Number(val).toFixed(8).toString()
      }
      // else {
      //   // remain input box w single zero, but keep zero when have decimal
      //   val = val.replace(/^[0]+/g, "0")
      //   // if it is no value
      //   if (val.length === 0) {
      //     val = "0"
      //   }
      // }

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
        <label className="text-sm">{label}</label>
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
           text-zinc-500 usd"
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
        {allowSelectToken && (
          <div className="left-action">
            <SelectToken options={tokenOptions} onChange={(token) => onChangeToken(token)} values={selectedToken} />
          </div>
        )}

        <input
          className={cx(
            {
              "rounded w-full h-full text-xs lg:text-sm": true,
              disable: disabled
            },
            classNameInput
          )}
          placeholder={placeHolder}
          onChange={(e) => handleChange(Number(e.target.value))}
          value={values}
          type={type || "number"}
          min={min}
          max={max}
        />
        {rightAction}
        {showMaxBtn && (
          <label
            className="font-very-small cursor-pointer max-btn border rounded-md p-2"
            onClick={() => handleChange(balance?.formatted)}
          >
            Max
          </label>
        )}
      </div>

      {showBalance && (
        <label className="text-xs lg:text-sm text-zinc-500 balance">
          {balance?.formatted} {balance?.symbol}
        </label>
      )}
    </div>
  )
}

export default InputCustom
