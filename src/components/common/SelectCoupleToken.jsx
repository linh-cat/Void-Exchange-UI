import React, { useState, useMemo } from "react"

import cx from "classnames"

import { useExchangeContext } from "src/contexts/ExchangeContext"
import usePriceInfoBar from "src/hooks/usePriceInfoBar"
import useOutsideDetect from "../../hooks/useOutsideDetect"

import { formatDollar, formatPercentage } from "src/lib/formatter"

import { DownIcon } from "@icons/index"
import { BTC, ETH } from "@img/token"

import "./SelectCoupleToken.css"

const mappingLabel = {
  BTC: "BTC/USD",
  ETH: "ETH/USD",
  LINK: "LINK/USD"
}
const mappingIcon = {
  BTC: BTC,
  ETH: ETH
}
const SelectCoupleToken = ({ defaultValue = "BTC/USD" }) => {
  const [values, setValues] = useState(defaultValue)

  const [openList, setOpenList] = useState(false)

  const { setPair } = useExchangeContext()
  const { data: listPrice } = usePriceInfoBar()

  const listOptions = useMemo(() => {
    if (listPrice) {
      delete listPrice.LINK

      return Object.keys(listPrice).map((item) => ({
        label: mappingLabel?.[item],
        value: mappingLabel?.[item],
        icon: mappingIcon?.[item],
        price: listPrice?.[item]?.priceChange,
        dayChange: listPrice?.[item]?.priceChangePercent
      }))
    }
    return []
  }, [listPrice])

  const toggleOpen = () => {
    setOpenList(!openList)
  }

  const onChangeValue = (value) => {
    setValues(value)
    setPair(value)
    setOpenList(false)
  }

  const handleClickOutside = () => {
    setOpenList(false)
  }

  const refOutside = useOutsideDetect(handleClickOutside)

  const { label, icon } = useMemo(() => {
    const index = listOptions.findIndex((item) => item.value === values)
    return { label: listOptions[index]?.label, icon: listOptions[index]?.icon }
  }, [listOptions, values])

  return (
    <div className="couple-token ">
      <div
        className="dd-couple-token-header flex gap-2 items-center text-white cursor-pointer"
        ref={refOutside}
        onClick={toggleOpen}
      >
        <img src={icon} alt="btc" className="rounded-full w-7 h-7" />
        <label className="cursor-pointer text-lg label font-bold">{label}</label>
        <img src={DownIcon} className={`${openList ? "rotate180" : ""} w-3`} alt="downicon" />
      </div>
      <div className={`${openList ? "open" : "close"} dd-couple-token-list card overflow-x-auto rounded`}>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase ">
            <tr>
              <th scope="col" className="px-8 py-3 rounded-l-lg">
                Pair
              </th>
              <th scope="col" className="px-8 py-3 whitespace-nowrap">
                Last price
              </th>
              <th scope="col" className="px-8 py-3 rounded-r-lg whitespace-nowrap">
                24h Change
              </th>
            </tr>
          </thead>
          <tbody>
            {listOptions.map((item, idx) => (
              <tr
                className="cursor-pointer dd-couple-token-item hover:bg-slate-900"
                key={idx}
                onClick={() => onChangeValue(item.value)}
              >
                <th scope="row" className="px-8 py-4 font-medium whitespace-nowrap flex items-center">
                  <img src={item.icon} alt="icon" className="rounded-full w-5 h-5 mr-1" />
                  <label>{item.label}</label>
                </th>
                <td
                  className={cx("px-8 py-4", {
                    "green-up": Number(item.dayChange) > 0,
                    "red-down": Number(item.dayChange) < 0
                  })}
                >
                  {formatDollar(item.price)}
                </td>
                <td
                  className={cx("px-8 py-4", {
                    "green-up": Number(item.dayChange) > 0,
                    "red-down": Number(item.dayChange) < 0
                  })}
                >
                  {formatPercentage(item.dayChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SelectCoupleToken
