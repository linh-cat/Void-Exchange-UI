import { useMemo, useState } from "react"
import cx from "classnames"

import { DownIcon } from "@icons/index"
import { CheckIcon } from "@heroicons/react/24/solid"

import useOutsideDetect from "src/hooks/useOutsideDetect"

import "./InputWithToken.css"
import { useAccount, useBalance } from "wagmi"

const DECIMAL_REGEX = RegExp("^[0-9]*[.]{1}[0-9]*$")

const decimalCount = (numb) => {
  const converted = numb.toString()
  if (converted.includes(".")) {
    return converted.split(".")[1].length
  }
  return 0
}

const InputWithToken = ({ tokenOptions, tokenValue, onSelectToken, inputValue, onChangeInput, type = "number" }) => {
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address: address,
    token: tokenValue,
    watch: true
  })

  const [isShowDropdownToken, setIsShowDropdownToken] = useState(false)

  const renderLabel = useMemo(() => {
    const index = tokenOptions?.findIndex((item) => item.value === tokenValue)

    return { label: tokenOptions[index]?.label, icon: tokenOptions[index]?.icon }
  }, [tokenValue, tokenOptions])

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
    if (Number(inputValue) > Number(balance?.formatted) - 1) {
      return "Max Balance to pay."
    }
    if (Number(inputValue) === 0) {
      return "Please input pay."
    }
    return " To ensure a smooth transaction, at least 0.05 ETH must be left in your wallet to pay for gas fees."
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

  console.log({ balance })

  const refOutside = useOutsideDetect(handleClickOutside)

  return (
    <div className="input-custom border px-2 py-2 flex flex-col gap-1 input-shadow">
      <div className="top flex items-center justify-between">
        <div className="select-token w-1/3 relative" onClick={onShowOptionToken} ref={refOutside}>
          <div className="flex items-center justify-between px-2 py-2 cursor-pointer border rounded">
            <div className="flex item-center gap-2">
              <img className="w-6 h-6" alt="token" src={renderLabel?.icon} />
              <label className="">{renderLabel?.label}</label>
            </div>

            <img src={DownIcon} alt="down" className={"rotate180"} />
          </div>
          <div
            className={cx({
              "token-list absolute bg-input w-full rounded": true,
              "close-dropdown": !isShowDropdownToken,
              "open-dropdown": isShowDropdownToken
            })}
          >
            {tokenOptions?.map((item) => (
              <div
                className={cx({
                  "flex items-center justify-between py-2 px-1 cursor-pointer": true,
                  disable: item?.disabled
                })}
                onClick={() => onChangeToken(item?.value)}
              >
                <div className="flex items-center gap-1 ">
                  <img src={item?.icon} alt="token" className="h-6 w-6" />
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
            className="py-1 px-0 text-right w-full"
            placeholder="0.0"
            onChange={(e) => onHandleChangeInput(e.target.value)}
            value={inputValue}
          />
        </div>
      </div>
      <div className="middle flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <label className="text-slate-500">Balance:</label>
            <div className="text-slate-500">
              {balance?.formatted} {balance?.decimals}
            </div>
          </div>
          <div
            className="border px-1 py-1 rounded bg-input cursor-pointer text-xs"
            onClick={() => onChangeInput(balance?.formatted)}
          >
            Max
          </div>
        </div>
        <div className="text-slate-500">$41,915</div>
      </div>
      <div className="infor flex flex-col gap-1">
        <div
          className={cx(
            {
              "h-1 w-full rounded": true
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
