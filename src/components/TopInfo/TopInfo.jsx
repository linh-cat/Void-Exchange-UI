import React from "react"
import "./TopInfo.css"
import { DownIcon } from "@img/icons/index"

const TopInfo = () => {
  return (
    <div className="w-full top-info text-sm flex sm:justify-center items-center py-1 px-2 md:px-0 gap-5 overflow-x-auto no-scrollbar relative sm:overflow-visible">
      <div className="relative flex gap-2 cursor-pointer flex-col md:flex-row market">
        <label>Market</label>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-slate-500 green-color ">Greed</span>
          <img src={DownIcon} alt="downicon" className="w-2" />
        </div>
        <div className="absolute top-5 left-0 z-50 w-64 p-3 rounded flex flex-col gap-y-1 card tooltip-market">
          <div className="flex justify-between">
            <label className="text-slate-500">Index</label>
            <div className="green-color">60</div>
          </div>
          <div className="flex justify-between">
            <label className="text-slate-500">Next update</label>
            <div>in 10 hour</div>
          </div>
          <div className="flex justify-between bg-green-400 mt-3 rounded-sm p-1 author">
            <label>Data From</label>
            <div>Crypto Fear & Greed Index</div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex gap-2 relative flex-col md:flex-row gas">
        <label className="whitespace-nowrap">ETH Gas</label>
        <div className="purple-color">131 Gwei</div>
        <div className="absolute top-5 left-0 z-50 w-52 p-3 rounded flex flex-col gap-y-2 card  tooltip-gas ">
          <div className="flex justify-between items-center">
            <label className="text-slate-500">Safe</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-slate-500">Standard</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-slate-500">Fast</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center p-1 mt-3 bg-violet-600 rounded-sm data-from">
            <label className="">Data From</label>
            <div className="text-teal-400">Etherscan</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <label>Network</label>
        <div className="text-slate-500 mt-auto">Ethereum</div>
      </div>
      <div className="flex gap-2 flex-col md:flex-row">
        <label className="whitespace-nowrap">BTC Dominance</label>
        <div className="text-slate-500 mt-auto">47%</div>
      </div>
      <div className="flex gap-2 flex-col md:flex-row">
        <label className="whitespace-nowrap">ETH Dominance</label>
        <div className="text-slate-500 mt-auto">19.3%</div>
      </div>
    </div>
  )
}

export default TopInfo
