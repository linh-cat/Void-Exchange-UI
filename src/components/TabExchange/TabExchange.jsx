import ArrowTrendingUpIcon from "@img/icons/ArrowTrendingUp.svg"
import ArrowTrendingDown from "@img/icons/ArrowTredingDown.svg"
import React, { useMemo, useState } from "react"
import "./TabExchange.css"
import cx from "classnames"
import { Side } from "@void-0x/void-sdk"
import LongOrderBox from "@components/LongOrderBox/LongOrderBox"
import ShortOrderBox from "@components/ShortOrderBox/ShortOrderBox"

const tabData = [
  {
    label: "Long",
    value: Side.LONG,
    icon: ArrowTrendingUpIcon,
    component: <LongOrderBox />,
    activeClassName: "active-long"
  },
  {
    label: "Short",
    value: Side.SHORT,
    icon: ArrowTrendingDown,
    component: <ShortOrderBox />,
    activeClassName: "active-short"
  }
  // {
  //   label: "Swap",
  //   value: "swap",
  //   icon: ArrowRightLeftIcon,
  //   component: <Swap />,
  // },
]

const TabExchange = ({ defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  const tabContent = useMemo(() => {
    const index = tabData.findIndex((item) => item.value === activeTab)

    return tabData[index]?.component
  }, [activeTab])

  return (
    <div key={activeTab} className="w-full h-full border-l border-b border-gray-700">
      <div className="order-tab">
        <ul className="grid grid-flow-col text-center main-tab border-b border-gray-700 mt-auto h-full">
          {tabData.map((item, idx) => {
            return (
              <li
                onClick={() => changeTab(item.value)}
                className={cx("tab-item", {
                  [item.activeClassName]: item.value === activeTab
                })}
                key={idx}
              >
                <img src={item.icon} alt="icon" className="w-5" />
                <label className="flex justify-center ">{item.label}</label>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="tab-content py-3 px-3 overflow-hidden">{tabContent}</div>
    </div>
  )
}

export default TabExchange
