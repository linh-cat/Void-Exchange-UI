import BarChart from "@components/BarChart/BarChart"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import React from "react"

const SectionVaultStats = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <div className="card-deposit-vault grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <CardWrapper className="xl:col-span-2 relative p-3">
          <CardWrapper className="w-40 border border-slate-500 rounded p-2 absolute left-2 top-2">
            <div className="filter-bar flex justify-between">
              <div>1D</div>
              <div>1W</div>
              <div>1M</div>
              <div>1Y</div>
              <div>ALL</div>
            </div>
          </CardWrapper>
          <div className="">
            <BarChart showGrid={false} showLegend={false} showXaxis={false} showYaxis={false} labelForChart="Earn" />
          </div>
        </CardWrapper>
        <div className="gr-info border border-slate-500 grid grid-cols-1 md:grid-cols-2 grid-rows-3 p-5 gap-5">
          <CardWrapper className="liquidity p-3" hasShadow={true}>
            <label className="text-slate-500 text-xs">Liquidity</label>
            <div className="">$11.06m</div>
            <span className="text-xs green-up">+0.08</span>
          </CardWrapper>
          <CardWrapper className="volume p-3" hasShadow={true}>
            <label className="text-slate-500 text-xs">Volume(24h)</label>
            <div>$13.82k</div>
            <span className="red-down text-xs">-73.40%</span>
          </CardWrapper>
          <CardWrapper className="fee p-3" hasShadow={true}>
            <label className="text-slate-500 text-xs">Fee(24h)</label>
            <div>$41.27</div>
            <span className="red-down text-xs">-73.04</span>
          </CardWrapper>
          <CardWrapper className="transaction p-3" hasShadow={true}>
            <label className="text-slate-500 text-xs">Transaction(24h)</label>
            <div>3</div>
            <span className="red-down text-xs">-40%</span>
          </CardWrapper>
        </div>
      </div>
    </div>
  )
}

export default SectionVaultStats
