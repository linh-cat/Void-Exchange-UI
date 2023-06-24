import React, { useMemo, useState } from "react"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import useOutsideDetect from "../../hooks/useOutsideDetect"
import { DownIcon } from "@icons/index"
import cx from "classnames"

import "./SelectCustom.css"

const SelectCustom = ({ options, label, tooltip, className, classNameInput, classNameOption, values, onChange }) => {
  const [openList, setOpenList] = useState(false)
  const toggleOpen = () => {
    setOpenList(!openList)
  }

  const handleChangeOptions = (value) => {
    onChange(value)
    setOpenList(false)
  }
  const handleClickOutside = () => {
    setOpenList(false)
  }
  const refOutside = useOutsideDetect(handleClickOutside)

  const renderLabel = useMemo(() => {
    const index = options.findIndex((item) => item.value === values)
    return { label: options[index]?.label, icon: options[index]?.icon }
  }, [options, values])

  return (
    <div
      className={cx(
        {
          "select-custom flex flex-col gap-y-1": true
        },
        className
      )}
    >
      <div className="flex items-center gap-1">
        <label className="text-sm text-slate-500">{label}</label>
        {tooltip && (
          <div className="group-tooltip">
            <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
            <div className="tooltip p-3 rounded">{tooltip}</div>
          </div>
        )}
      </div>

      <div className="dd-wrapper">
        <div
          className={cx(
            {
              "dd-header border rounded w-full h-full cursor-pointer flex items-center justify-between": true
            },
            classNameInput
          )}
          onClick={toggleOpen}
          ref={refOutside}
        >
          <div className="flex items-center gap-1">
            {renderLabel?.icon && <img src={renderLabel.icon} alt="icon" />}
            <label className="dd-header-title text-xs lg:text-sm">{renderLabel.label}</label>
          </div>

          <img src={DownIcon} alt="down" className={openList ? "rotate180" : ""} />
        </div>
        <div className={`${openList ? "open" : "close"}  dd-list round-b w-full h-full bg-input p-2 `}>
          {options?.map((op, idx) => (
            <div key={idx}>
              <div
                className={cx({
                  "dd-list-item p-3 cursor-pointer text-sm 2xl:text-base flex items-center gap-2": true,
                  disabled: op.disabled
                })}
                onClick={() => handleChangeOptions(op.value)}
              >
                {op.icon && <img src={op.icon} alt="icon" className="w-5 h- 5 icon" />}
                <label className={`${classNameOption} whitespace-nowrap`}>{op.label}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectCustom
