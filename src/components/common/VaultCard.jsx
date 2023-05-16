import React from "react"
import "./VaultCard.css"
import ETH from "@img/WETH.png"
import { useHistory } from "react-router-dom"
import Chart, { CategoryScale } from "chart.js/auto"

import LineChart from "@components/LineChart/LineChart"
Chart.register(CategoryScale)

const VaultCard = () => {
  const history = useHistory()
  function handleClick() {
    history.push("/vault/1")
    window.location.reload()
  }

  return (
    <div
      className="vault-card flex flex-col w-full border rounded-lg border-slate-500 cursor-pointer bg-hover-eth overflow-hidden"
      onClick={handleClick}
    >
      <div className="vault-card-top w-full h-1/3 bg-slate-600 relative bg-eth p-5">
        <div className="vault-card-header">
          <button className="btn font-medium px-2 py-2 rounded-sm uppercase text-xs tracking-wider">Put-Selling</button>
        </div>
        <img src={ETH} alt="eth" className="w-12 h-12 absolute left-5 -bottom-6" />
      </div>
      <div className="vault-card-bottom pt-10 px-5 flex flex-col justify-between flex-1 pb-2">
        <div className="flex justify-between">
          <h3 className="vault-card-title font-medium text-2xl">T-ETH-C</h3>
          <div className="w-24">
            <LineChart />
          </div>
        </div>

        <div className="flex flex-col gap-2 project-yeild ">
          <label className="text-xs text-slate-500">Total Project Yield (APY)</label>
          <p className="font-medium text-2xl">57.39%</p>
        </div>
        <div className="weekly-strike flex justify-between">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500">Weekly Strike Price</label>
            <p className="text-sm">$1,950.00</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500">Current Price</label>
            <p className="text-sm">$1,814.58</p>
          </div>
        </div>
        <div className="deposit-cap flex justify-between">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500">Current Deposit</label>
            <p className="text-sm">4,155.41 ETH</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500">Max Capacity</label>
            <p className="text-sm">20K ETH</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultCard