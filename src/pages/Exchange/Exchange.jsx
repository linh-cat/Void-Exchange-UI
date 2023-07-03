import React, { useEffect, useState, useMemo } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import cx from "classnames"
import { formatUnits } from "viem"
import { LIST_SECTIONS, optionLabels } from "./constant"
import TopInfo from "@components/TopInfo/TopInfo"
import TradingViewChart from "./TradingViewChart"
import InforBarChar from "./InforBarChar"
import LatestTrade from "./LatestTrade"
import Tab from "@components/Tab/Tab"
import { POSITIONS } from "./constant"
import ListPosition from "./ListPosition"
import TabExchange from "../../components/TabExchange/TabExchange"
import "./Exchange.css"

const Exchange = () => {
  const [tabSection, setTabSection] = useState(LIST_SECTIONS[0])
  const [showHistory, setShowHistory] = useState(false)

  const { sendMessage, lastMessage, readyState } = useWebSocket("wss://api.void.exchange")

  const onChangeTabSection = (val) => {
    setTabSection(val)
  }

  /**
   *
   * @param {[]Object} options
   */
  const price = useMemo(() => {
    if (lastMessage?.data) {
      try {
        const data = JSON.parse(lastMessage.data)
        if (data.p) {
          console.info("formatUnits(data.p, 18)", formatUnits(data.p, 18))
          return formatUnits(data.p, 18).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }
      } catch (err) {
        console.error(err)
      }

      return "0"
    }
  }, [lastMessage])

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ type: "subscribe", channels: ["BTC"] }))
    }
  }, [readyState])

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState]

  console.log("connectionStatus", connectionStatus)

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
      <div className="exchange w-full xl:grid-flow-col xl:grid xl:grid-cols-5 vh-90 border overflow-y-auto no-scrollbar">
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
                <InforBarChar price={price} />
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
