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
import TopInfo from "@components/TopInfo/TopInfo"

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
      <div className={cx({ "p-3 section-list": true })}>
        <Tab
          optionLabels={optionLabels}
          options={LIST_SECTIONS}
          option={tabSection}
          setOption={onChangeTabSection}
          className={"mb-3"}
        />
        {tabSection === POSITIONS && <ListPosition />}
        {/* {tabSection === ORDERS && <OrderHistory />} */}
        {/* {tabSection === TRADES && <TradeHistory />} */}
      </div>
    )
  }

  return (
    <>
      <TopInfo />
      <div className="exchange w-full xl:grid-flow-col xl:grid xl:grid-cols-5 vh-90">
        {/* left side chart and infor bar */}
        <div
          className={cx({
            "xl:col-span-3": showHistory,
            "xl:col-span-4": !showHistory,
            "left-side xl:row-span-3 xl:flex xl:flex-col vh-70": true
          })}
        >
          <div className="relative">
            <InforBarChar />
            <div className="flex items-center absolute top-1/3 right-2">
              <input type="checkbox" checked={showHistory} onChange={onChangeHistory} />
              <label className="text-xs">Show History</label>
            </div>
          </div>
          <div className="flex-1 border">
            <div
              className={cx({
                "xl:col-span-3 sm:col-span-5": showHistory,
                "xl:col-span-4": !showHistory,
                "h-96 lg:h-full relative": true
              })}
            >
              <TradingViewChart />
            </div>
          </div>
        </div>

        {/* position */}
        <div
          className={cx({
            "position border flex-1": true,
            "xl:row-span-1 xl:col-span-3": showHistory,
            "xl:col-span-4 xl:row-span-1": !showHistory
          })}
        >
          {renderListSections()}
        </div>

        {/* history */}
        {showHistory && (
          <div className="xl:col-span-1 xl:row-span-3 border-l border-b">
            <LatestTrade />
          </div>
        )}

        {/* order box */}
        <div className="xl:col-span-1 xl:row-span-4 right-side">
          <TabExchange defaultValue="long" />
        </div>
      </div>
    </>
  )
}

export default Exchange
