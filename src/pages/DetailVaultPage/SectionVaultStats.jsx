import BarChart from "@components/BarChart/BarChart"
import React from "react"

const SectionVaultStats = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <div className="card-deposit-vault grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5 gap-5">
        <div className="xl:col-span-2 border border-slate-500 rounded relative">
          <div className="w-40 border border-slate-500 rounded p-3 absolute left-0 top-0">
            <div className="filter-bar flex justify-between">
              <div>1D</div>
              <div>1W</div>
              <div>1M</div>
              <div>1Y</div>
              <div>ALL</div>
            </div>
          </div>
          <div className="">
            <BarChart showGrid={false} showLegend={false} showXaxis={false} showYaxis={false} labelForChart="Earn" />
          </div>
        </div>
        <div className="gr-info border border-slate-500 grid grid-cols-1 md:grid-cols-2 grid-rows-3 p-5 gap-5">
          <div className="liquidity border border-slate-500 p-3 shadow">
            <label className="text-slate-500 text-xs">Liquidity</label>
            <div className="">$11.06m</div>
            <span className="text-xs green-up">+0.08</span>
          </div>
          <div className="volume border border-slate-500 p-3 shadow">
            <label className="text-slate-500 text-xs">Volume(24h)</label>
            <div>$13.82k</div>
            <span className="red-down text-xs">-73.40%</span>
          </div>
          <div className="fee border border-slate-500 p-3 shadow">
            <label className="text-slate-500 text-xs">Fee(24h)</label>
            <div>$41.27</div>
            <span className="red-down text-xs">-73.04</span>
          </div>
          <div className="transaction border border-slate-500 p-3 shadow">
            <label className="text-slate-500 text-xs">Transaction(24h)</label>
            <div>3</div>
            <span className="red-down text-xs">-40%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionVaultStats
