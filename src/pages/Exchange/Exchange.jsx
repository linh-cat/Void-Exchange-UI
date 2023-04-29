import React from "react"
import "./Exchange.css"
import TabExchange from "../../components/TabExchange/TabExchange"
import TradingViewChart from "./TradingViewChart"
import InforBarChar from "./InforBarChar"

const Exchange = () => {
  return (
    <div className="exchange w-full lg:grid lg:grid-cols-5">
      <div className="left-side md:col-span-3 lg:col-span-4 lg:flex lg:flex-col">
        <div className="">
          <InforBarChar />
        </div>
        <div className="h-full">
          <TradingViewChart />
        </div>
      </div>
      <div className="lg:col-span-1">
        <TabExchange defaultValue="long" />
      </div>
    </div>
  )
}

export default Exchange
