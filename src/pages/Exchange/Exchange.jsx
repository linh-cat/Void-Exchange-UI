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

  /**
   *
   * @param {[]Object} options
   */
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
      <div className="exchange w-full xl:grid-flow-col xl:grid xl:grid-cols-5 vh-90 border">
        {/* left side chart and infor bar */}
        <div
          className={cx({
            "left-side xl:flex xl:flex-col xl:col-span-4": true
          })}
        >
          <div className="grid grid-cols-1 xl:grid-cols-4 vh-65">
            <div
              className={cx({
                "xl:col-span-3": showHistory,
                "xl:col-span-4": !showHistory,
                "flex flex-col": true
              })}
            >
              <div className="relative">
                <InforBarChar />
                <div className="flex items-center absolute top-1/3 right-2">
                  <input type="checkbox" checked={showHistory} onChange={onChangeHistory} />
                  <label className="text-xs">Show History</label>
                </div>
              </div>
              <div className="flex-1">
                <TradingViewChart />
              </div>
            </div>
            {/* history */}
            {showHistory && (
              <div className="border-l border-b">
                <LatestTrade />
              </div>
            )}
          </div>

          {/* position */}
          <div
            className={cx({
              "flex-1": true
            })}
          >
            {renderListSections()}
          </div>
        </div>
        {/* order box */}
        <div className="xl:col-span-1 right-side">
          <TabExchange defaultValue={0} />
        </div>
      </div>
    </>
  )
}

export default Exchange
