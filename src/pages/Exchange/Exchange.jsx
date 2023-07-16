import React, { useEffect, useState } from "react"
import cx from "classnames"
import { LIST_SECTIONS, optionLabels } from "./constant"
import TopInfo from "@components/TopInfo/TopInfo"
import TradingViewChart from "./TradingViewChart"
import LatestTrade from "./LatestTrade"
import Tab from "@components/Tab/Tab"
import { POSITIONS } from "./constant"
import ListPosition from "./ListPosition"
import TabExchange from "../../components/TabExchange/TabExchange"
import "./Exchange.css"
import InfoBarChar from "./InfoBarChar"
import SEO from "@components/common/SEO"
import { getPageTitle } from "src/lib/utils"

const Exchange = () => {
  const [tabSection, setTabSection] = useState(LIST_SECTIONS[0])
  const [showHistory, setShowHistory] = useState(false)
  const onChangeTabSection = (val) => {
    setTabSection(val)
  }

  const renderListSections = () => {
    return (
      <div className={cx("w-full")}>
        <Tab
          optionLabels={optionLabels}
          options={LIST_SECTIONS}
          option={tabSection}
          setOption={onChangeTabSection}
          className={"px-3 py-1"}
        />
        {tabSection === POSITIONS && <ListPosition />}
        {/* {tabSection === ORDERS && <OrderHistory />} */}
        {/* {tabSection === TRADES && <TradeHistory />} */}
      </div>
    )
  }

  return (
    <SEO title={getPageTitle("Trading")}>
      <TopInfo />
      <div className="exchange w-full xl:grid-flow-col xl:grid xl:grid-cols-5 vh-90 border overflow-y-auto no-scrollbar">
        {/* left side chart and infor bar */}
        <div className={cx("xl:flex xl:flex-col xl:col-span-4")}>
          <div className="grid grid-cols-1 xl:grid-cols-4 vh-65">
            <div
              className={cx(
                {
                  "xl:col-span-3": showHistory,
                  "xl:col-span-4": !showHistory
                },
                "flex flex-col"
              )}
            >
              <div className="relative">
                <InfoBarChar />
                {/* <div className="flex items-center absolute top-1/3 right-2"> */}
                {/*   <input type="checkbox" checked={showHistory} onChange={onChangeHistory} /> */}
                {/*   <label className="text-xs">Show History</label> */}
                {/* </div> */}
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
          <div className={cx("vh-25")}>{renderListSections()}</div>
        </div>
        {/* order box */}
        <div className="xl:col-span-1 vh-90 border">
          <TabExchange defaultValue={0} />
        </div>
      </div>
    </SEO>
  )
}

export default Exchange
