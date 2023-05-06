import React from "react"
import "./TopInfo.css"
import Down from "@img/downicon.svg"

const TopInfo = () => {
  return (
    <div className="top-info border-b border-zinc-700 text-sm flex items-center justify-center gap-5 p-1">
      <div className="relative flex gap-2 market cursor-pointer">
        <label className="">Market:</label>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs green-color">Greed</span>
          <img src={Down} alt="downicon" className="w-2" />
        </div>
        <div className="tooltip-market absolute top-5 -left-1/2 z-50 w-64 p-3 rounded-sm text-xs flex flex-col gap-y-1">
          <div className="flex justify-between">
            <label className="text-zinc-500">Index</label>
            <div className="green-color">60</div>
          </div>
          <div className="flex justify-between">
            <label className="text-zinc-500">Next update</label>
            <div>in 10 hour</div>
          </div>
          <div className="flex justify-between bg-green-400 mt-3 rounded-sm p-1 author">
            <label>Data From</label>
            <div>Crypto Fear & Greed Index</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 relative gas">
        <label>ETH Gas:</label>
        <div className="purple-color">131 Gwei</div>
        <div className="tooltip-gas absolute top-5 -left-1/2 z-50 w-40 p-3 rounded-sm text-xs flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <label className="text-zinc-500">Safe</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-zinc-500"> Standard</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-zinc-500">Fast</label>
            <div>128 Gwei</div>
          </div>
          <div className="flex justify-between items-center p-1 mt-3 bg-violet-600 rounded-sm data-from">
            <label className="">Data From</label>
            <div>Etherscan</div>
          </div>
        </div>
      </div>
      <div>
        <label>Network:</label>
      </div>
    </div>
  )
}

export default TopInfo
