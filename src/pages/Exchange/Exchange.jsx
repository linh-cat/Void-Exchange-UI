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
  const [showHistory, setShowHistory] = useState(true)
  const onChangeTabSection = (val) => {
    setTabSection(val)
  }
  const onChangeHistory = () => {
    setShowHistory(!showHistory)
  }
  const renderListSections = () => {
    return (
      <div className="p-3 h-96 w-full">
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
    <div className="exchange w-full lg:grid lg:grid-cols-5 border border-slate-700">
      <div className="left-side md:col-span-3 lg:col-span-4 lg:flex lg:flex-col">
        <div className="relative">
          <InforBarChar />
          <div className="flex items-center absolute top-1/3 right-2">
            <input type="checkbox" checked={showHistory} onChange={onChangeHistory} />
            <label className="text-xs">Show History</label>
          </div>
        </div>
        <div className="flex-1">
          <div className={cx({ "lg:grid sm:grid-cols-4": true, "h-2/3": !showHistory })}>
            <div
              className={cx({
                "lg:col-span-3 sm:col-span-5": showHistory,
                "lg:col-span-4": !showHistory,
                "h-full": true
              })}
            >
              <TradingViewChart />
            </div>
            {showHistory && (
              <div className="latest-trade border-t border-b border-slate-700">
                <LatestTrade />
              </div>
            )}
          </div>
          <div className="position flex-1">{renderListSections()}</div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <TabExchange defaultValue="long" />
      </div>
    </div>
  )
}

export default Exchange
