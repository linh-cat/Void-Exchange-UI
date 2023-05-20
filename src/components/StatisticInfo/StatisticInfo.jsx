import React from "react"
import "./StatisticInfo.css"
import CardWrapper from "@components/CardWrapper/CardWrapper"

const StatisticInfo = () => {
  return (
    <div className="container mx-auto statistic-container text-center flex flex-col gap-10 mt-10">
      <div className="statistic-top flex flex-col gap-3">
        <h3 className="text-slate-500 uppercase font-medium text-sm tracking-wider">battle tested</h3>
        <h2 className="font-medium text-2xl">Trusted by over 25,000 traders</h2>
        <p className="text-sm">We believe everyone should have access to open & powerful financial tools.</p>
      </div>
      <CardWrapper hasShadow={true}>
        <div className="statistic-bottom flex flex-col lg:grid lg:grid-flow-col lg:grid-cols-3">
          <div className="trading-volume p-5 flex flex-col gap-3">
            <h5 className="text-slate-500">Trading Volume</h5>
            <span className="font-medium text-3xl ">$999,757,143</span>
            <p className="text-slate-500 text-sm">Last 24h</p>
          </div>
          <div className="trades p-5 border-r border-l border-slate-800 flex flex-col gap-3">
            <h5 className="text-slate-500">Trades</h5>
            <span className="font-medium text-3xl ">$216,344</span>
            <p className="text-slate-500 text-sm">Last 24h</p>
          </div>
          <div className="open-interest p-5 flex flex-col gap-3">
            <h5 className="text-slate-500">Open Interest</h5>
            <span className="font-medium text-3xl ">$69,581,373</span>
            <p className="text-slate-500 text-sm">Last 24h</p>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}

export default StatisticInfo
