import React, { useState } from "react"
import "./SelectCoupleToken.css"
import useOutsideDetect from "../../hooks/useOutsideDetect"
import { useMemo } from "react"
import { DownIcon } from "@icons/index"
import { BTC, ETH } from "@img/token"
import { useExchangeContext } from "src/contexts/ExchangeContext"

const options = [
  {
    label: "BTC/USD",
    value: "BTC/USD",
    icon: BTC,
    price: "$27.000",
    dayChange: "0.18%"
  },
  {
    label: "ETH/USD",
    value: "ETH/USD",
    icon: ETH,
    price: "$1.000",
    dayChange: "0.1%"
  }
]

const SelectCoupleToken = ({ defaultValue = "BTC/USD" }) => {
  const [openList, setOpenList] = useState(false)
  const [values, setValues] = useState(defaultValue)
  const { setPair } = useExchangeContext()

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
    const index = options.findIndex((item) => item.value === values)
    return { label: options[index]?.label, icon: options[index]?.icon }
  }, [values])

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
            {options.map((item, idx) => (
              <tr className="cursor-pointer dd-couple-token-item" key={idx} onClick={() => onChangeValue(item.value)}>
                <th scope="row" className="px-8 py-4 font-medium whitespace-nowrap flex items-center">
                  <img src={item.icon} alt="icon" className="rounded-full w-5 h-5 mr-1" />
                  <label>{item.label}</label>
                </th>
                <td className="px-8 py-4 red-down">{item.price}</td>
                <td className="px-8 py-4 green-up">{item.dayChange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SelectCoupleToken
