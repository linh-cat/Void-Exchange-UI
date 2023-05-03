import React, { useEffect, useState } from "react"
import cx from "classnames"
const rangeSwitcher = [
  {
    label: "5m",
    value: "5m"
  },
  {
    label: "15m",
    value: "15m"
  },
  {
    label: "1h",
    value: "1h"
  },
  {
    label: "4h",
    value: "4h"
  },
  {
    label: "1D",
    value: "1d"
  }
]

const RangeSwitcher = ({ setRangeSwitcher, rangeSwitcherValue }) => {
  console.log({ rangeSwitcherValue })
  return (
    <div className="switcher-group border inline-block">
      {rangeSwitcher?.map((i) => {
        return (
          <button
            onClick={() => setRangeSwitcher(i.value)}
            key={i.value}
            className={cx({
              "py-1 px-3 text-sm rounded-sm range-switcher": true,
              active: rangeSwitcherValue === i.value
            })}
          >
            {i.label}
          </button>
        )
      })}
    </div>
  )
}

export default RangeSwitcher
