import React from "react"
import cx from "classnames"
import "./Tab.css"

const Tab = ({ options, className, optionLabels, option, setOption, onChange }) => {
  const onClick = (opt) => {
    if (setOption) {
      setOption(opt)
    }
    if (onChange) {
      onChange(opt)
    }
  }
  return (
    <div className={cx(className, "tab-custom", "text-zinc-400")}>
      {options?.map((opt) => {
        const label = optionLabels && optionLabels[opt] ? optionLabels[opt] : opt
        return (
          <div
            className={cx({ active: opt === option }, "font-medium cursor-pointer")}
            onClick={() => onClick(opt)}
            key={opt}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default Tab
