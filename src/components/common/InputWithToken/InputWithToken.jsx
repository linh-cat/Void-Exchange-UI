import { useMemo, useState } from "react"
import cx from "classnames"

import { DownIcon } from "@icons/index"
import { CheckIcon } from "@heroicons/react/24/solid"

import useOutsideDetect from "src/hooks/useOutsideDetect"

import "./InputWithToken.css"

const DECIMAL_REGEX = RegExp("^[0-9]*[.]{1}[0-9]*$")

const InputWithToken = ({ tokenOptions, tokenValues, onSelectToken, inputValues, onChangeInput }) => {
  const [isShowDropdownToken, setIsShowDropdownToken] = useState(false)

  const renderLabel = useMemo(() => {
    const index = tokenOptions?.findIndex((item) => item.value === tokenValues)

    return { label: tokenOptions[index]?.label, icon: tokenOptions[index]?.icon }
  }, [tokenValues, tokenOptions])

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

    // else {
    //   // remain input box w single zero, but keep zero when have decimal
    //   val = val.replace(/^[0]+/g, "0")
    //   // if it is no value
    //   if (val.length === 0) {
    //     val = "0"
    //   }
    // }

    return onChangeInput(val)
  }

  const refOutside = useOutsideDetect(handleClickOutside)

  return (
    <div className="input-custom border px-2 py-2 flex flex-col gap-1">
      <div className="top flex items-center justify-between">
        <div className="select-token w-1/3 relative" onClick={onShowOptionToken} ref={refOutside}>
          <div className="flex items-center justify-between px-2 py-2 cursor-pointer border select-shadow rounded">
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
                className="flex items-center justify-between py-2 px-1 cursor-pointer"
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
          />
        </div>
      </div>
      <div className="middle flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <label className="text-slate-500">Balance:</label>
            <div className="text-slate-500">0.082</div>
          </div>
          <div className="text-blue-600 cursor-pointer">Max</div>
        </div>
        <div className="text-slate-500">$41,915</div>
      </div>
      <div className="infor flex flex-col gap-1">
        <div className="h-1 w-full bg-emerald-500 rounded"></div>
        <div className="text-xs text-green-700">
          To ensure a smooth transaction, at least 0.05 ETH must be left in your wallet to pay for gas fees.
        </div>
      </div>
    </div>
  )
}

export default InputWithToken
