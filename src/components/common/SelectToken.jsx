import React, { useMemo, useState } from "react"
import useOutsideDetect from "../../hooks/useOutsideDetect"

import { DownIcon } from "@icons/index"
import { CheckIcon } from "@heroicons/react/24/solid"

import cx from "classnames"

import "./SelectToken.css"

const SelectToken = ({ options, onChange, values }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleChange = (token) => {
    onChange(token)
    setOpen(false)
  }

  const handleClickOutside = () => {
    setOpen(false)
  }

  const refOutside = useOutsideDetect(handleClickOutside)

  const renderLabel = useMemo(() => {
    const index = options?.findIndex((item) => item.value === values)

    return { label: options[index]?.label, icon: options[index]?.icon }
  }, [values, options])

  return (
    <div className={`dd-token rounded px-1 w-full`}>
      <div
        className="dd-token-label cursor-pointer gap-1 flex items-center justify-around h-full "
        onClick={toggleOpen}
        ref={refOutside}
      >
        <img className="rounded-full w-6 h-6" src={renderLabel?.icon} alt="btc" />
        <label className="cursor-pointer">{renderLabel?.label}</label>

        <img src={DownIcon} alt="down" className={open ? "rotate180" : ""} />
      </div>
      <div className={`${open ? "open" : "close"} dd-token-list p-2 rounded`}>
        {options?.map((item, idx) => (
          <div
            className={cx({
              "dd-token-item flex items-center justify-between w-full p-3": true,
              disable: item.disabled
            })}
            onClick={() => handleChange(item.value)}
            key={idx}
          >
            <div className="flex items-center gap-2">
              <img className="rounded-full w-7 h-7" src={item?.icon} alt="btc" />
              <div className="text-sm">
                <label>{item.label}</label>
              </div>
            </div>
            {item.value === renderLabel?.label && (
              <div>
                <CheckIcon className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectToken
