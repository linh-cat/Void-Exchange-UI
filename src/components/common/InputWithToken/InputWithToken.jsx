import { useMemo, useState } from "react"
import cx from "classnames"

import { DownIcon } from "@icons/index"
import { CheckIcon } from "@heroicons/react/24/solid"

import useOutsideDetect from "src/hooks/useOutsideDetect"

import { useAccount, useBalance } from "wagmi"
import { decimalsFormatter, formatValue } from "src/lib/formatter"
import { Constants } from "@void-0x/void-sdk"
import { useTokenPrice } from "src/hooks/useTokenPriceFeed"

const DECIMAL_REGEX = RegExp("^[0-9]*[.]{1}[0-9]*$")

const decimalCount = (numb) => {
  const converted = numb.toString()
  if (converted.includes(".")) {
    return converted.split(".")[1].length
  }
  return 0
}

const InputWithToken = ({
  tokenOptions,
  token,
  onSelectToken,
  inputValue,
  onChangeInput,
  type = "number",
  disabled
}) => {
  const [isShowDropdownToken, setIsShowDropdownToken] = useState(false)

  const { address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
    token,
    watch: true
  })
  const price = useTokenPrice(token)

  const renderLabel = useMemo(() => {
    const index = tokenOptions?.findIndex((item) => item.value === token)

    return { label: tokenOptions[index]?.label, icon: tokenOptions[index]?.icon }
  }, [token, tokenOptions])

  const onShowOptionToken = () => {
    setIsShowDropdownToken(!isShowDropdownToken)
  }

  const handleClickOutside = () => {
    setIsShowDropdownToken(false)
  }

  const onChangeToken = (token) => {
    onSelectToken(token)
    setIsShowDropdownToken(false)
  }

  const onHandleChangeInput = (val) => {
    if (type === "number") {
      if (isNaN(Number(val))) {
        return onChangeInput("0")
      }

      if (Number(val) < 0) {
        return onChangeInput("0")
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

      if (Number(val) > Number(balance?.formatted)) {
        return onChangeInput(balance?.formatted)
      }
      return onChangeInput(val)
    }
  }

  const textContentInput = useMemo(() => {
    if (inputValue === "") {
      return ""
    }

    if (Number(inputValue) === 0) {
      return "Please enter pay amount greater than 0"
    }

    if (Number(inputValue) > Number(balance?.formatted) - 1) {
      return "Max Balance to pay."
    }

    if (Number(inputValue) > 0) {
      return "To ensure a smooth transaction, at least 0.05 ETH must be left in your wallet to pay for gas fees."
    }
  }, [balance, inputValue])

  const bgslide = useMemo(() => {
    if (Number(inputValue) > Number(balance?.formatted) - 1) {
      return "bg-green"
    }
    if (Number(inputValue) === 0) {
      return "bg-red"
    }
    if (Number(inputValue) !== 0) {
      return "bg-yellow"
    }
  }, [balance, inputValue])

  const refOutside = useOutsideDetect(handleClickOutside)

  const tokenValueInUSD = useMemo(() => {
    if (balance?.value && price) {
      const valueDecimals = balance.decimals + Constants.ORACLE_PRICE_DECIMALS
      return formatValue(balance?.value * price, valueDecimals)
    }
  }, [balance, price])

  return (
    <div className="input-custom border px-2 py-2 flex flex-col gap-2 input-shadow">
      <div className="top flex items-center flex-row-reverse justify-between">
        <div
          className={cx({
            "select-token relative": true,
            disable: disabled
          })}
          onClick={onShowOptionToken}
          ref={refOutside}
        >
          <div className="flex items-center justify-between px-2 py-2 cursor-pointer border rounded gap-3">
            <img className="w-6 h-6" alt="token" src={renderLabel?.icon} />
            <label className="text-sm">{renderLabel?.label}</label>
            <img
              src={DownIcon}
              alt="down"
              className={cx({
                rotate180: isShowDropdownToken
              })}
            />
          </div>
          <div
            className={cx({
              "token-list absolute right-0 card rounded overflow-hidden p-2 z-50 w-48": true,
              "close-dropdown": !isShowDropdownToken,
              "open-dropdown": isShowDropdownToken
            })}
          >
            {tokenOptions?.map((item) => (
              <div
                className={cx({
                  "flex items-center justify-between py-2 px-1 cursor-pointer bg-hover ": true,
                  disabled: item?.disabled
                })}
                onClick={() => onChangeToken(item?.value)}
              >
                <div className="flex items-center gap-1 ">
                  <img src={item?.icon} alt="token" className="h-8 w-8" />
                  <label>{item?.label}</label>
                </div>
                {item.label === renderLabel?.label && (
                  <div>
                    <CheckIcon className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="py-1 px-0 w-full text-sm"
            placeholder="0.0"
            onChange={(e) => onHandleChangeInput(e.target.value)}
            value={inputValue}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="middle flex flex-row-reverse items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <label className="text-slate-500 text-sm">Balance:</label>
            <div className="text-slate-500 text-sm">{decimalsFormatter(Number(balance?.formatted), 4)}</div>
          </div>
          <div
            className={cx({
              "border px-1 py-1 rounded bg-input cursor-pointer text-xs": true,
              disabled: disabled
            })}
            onClick={() => onChangeInput(balance?.formatted)}
          >
            Max
          </div>
        </div>
        <div className="text-slate-500 text-sm">{tokenValueInUSD}</div>
      </div>
      <div className="infor flex flex-col gap-1">
        <div
          className={cx(
            {
              "h-1 w-full rounded": true,
              hidden: inputValue === ""
            },
            bgslide
          )}
        ></div>
        <div
          className={cx({
            "text-xs": true,
            yellow: bgslide === "bg-yellow",
            "red-down": bgslide === "bg-red",
            "green-up": bgslide === "bg-green"
          })}
        >
          {textContentInput}
        </div>
      </div>
    </div>
  )
}

export default InputWithToken
