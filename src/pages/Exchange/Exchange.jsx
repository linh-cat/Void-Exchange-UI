import React, { useState } from "react"
import "./Exchange.css"
import TabExchange from "../../components/TabExchange/TabExchange"
import TradingViewChart from "./TradingViewChart"
import InforBarChar from "./InforBarChar"
import LatestTrade from "./LatestTrade"
import Tab from "@components/Tab/Tab"
import { LIST_SECTIONS, optionLabels } from "./constant"
import { POSITIONS } from "./constant"
import ListPosition from "./ListPosition"
import OrderHistory from "./OrderList"
import { ORDERS } from "./constant"
import { TRADES } from "./constant"
import TradeHistory from "./TradeHistory"
import cx from "classnames"

const Exchange = () => {
  const [tabSection, setTabSection] = useState(LIST_SECTIONS[0])
  const [showHistory, setShowHistory] = useState(false)
  const onChangeTabSection = (val) => {
    setTabSection(val)
  }
  const onChangeHistory = () => {
    setShowHistory(!showHistory)
  }
  const renderListSections = () => {
    return (
      <div className={cx({ "p-3": true })}>
        <Tab
          optionLabels={optionLabels}
          options={LIST_SECTIONS}
          option={tabSection}
          setOption={onChangeTabSection}
          className={"mb-3"}
        />
        {tabSection === POSITIONS && <ListPosition />}
        {tabSection === ORDERS && <OrderHistory />}
        {tabSection === TRADES && <TradeHistory />}
      </div>
    )
  }
  return (
    <div>
      <div className="exchange w-full xl:grid xl:grid-cols-5 xl:grid-rows-3">
        <div className="left-side xl:col-span-3 xl:row-span-3 xl:flex xl:flex-col">
          <div className="relative border border-gray-700">
            <InforBarChar />
            {/* <div className="flex items-center absolute right-2">
              <input type="checkbox" checked={showHistory} onChange={onChangeHistory} />
              <label className="text-xs">Show History</label>
            </div> */}
          </div>
          <div className="flex-1 border border-gray-700">
            <div
              className={cx({
                "xl:col-span-3 sm:col-span-5": showHistory,
                "xl:col-span-4": !showHistory,
                "h-96 lg:h-full": true
              })}
            >
              <TradingViewChart />
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-3 middle-side border-b border-zinc-700">
          <LatestTrade />
        </div>
        <div className="xl:col-span-1 xl:row-span-3 right-side">
          <TabExchange defaultValue="long" />
        </div>
      </div>
      <div
        className={cx({
          position: true,
          "border border-gray-700": true
        })}
      >
        {renderListSections()}
      </div>
    </div>
  )
}

export default Exchange
