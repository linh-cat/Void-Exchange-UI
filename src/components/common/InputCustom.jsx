import React from "react"
import "./InputCustom.css"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
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
  headerAction
}) => {
  const DECIMAL_REGEX = RegExp("^[0-9]*[.]{1}[0-9]*$")

  const handleChange = (val) => {
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
    // else {
    //   // remain input box w single zero, but keep zero when have decimal
    //   val = val.replace(/^[0]+/g, "0")
    //   // if it is no value
    //   if (val.length === 0) {
    //     val = "0"
    //   }
    // }

    return onChange(val)
  }
  return (
    <div className={`${className} input-custom flex flex-col gap-y-1 w-full h-full`}>
      <div className="title flex items-center gap-x-1">
        <label className="text-sm">{label}</label>
        {label && (
          <div className="group-tooltip">
            <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
            <div className="tooltip p-3 rounded">{tooltip}</div>
          </div>
        )}
        {headerAction}
        {showUsd && value && (
          <div
            className="text-xs 
           text-zinc-500 usd"
          >
            ~$27.000
          </div>
        )}
      </div>
      <div className="flex h-full items-center border rounded pl-1 pr-1">
        {leftSide && <div className="left-action">{leftSide}</div>}
        <input
          className={`${classNameInput} rounded w-full h-full text-xs lg:text-sm`}
          placeholder={placeHolder}
          onChange={(e) => handleChange(Number(e.target.value))}
          value={value}
          type={type || "number"}
          min={min}
          max={max}
        />
        {rightAction}
        {showMaxBtn && <label className="font-very-small cursor-pointer max-btn border rounded-md p-2">Max</label>}
      </div>

      {showBalance && <label className="text-xs lg:text-sm text-zinc-500 balance">500000 ETC</label>}
    </div>
  )
}

export default InputCustom
