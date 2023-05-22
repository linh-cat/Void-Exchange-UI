import React from "react"
import PropTypes from "prop-types"
import "./VaultCard.css"
import Chart, { CategoryScale } from "chart.js/auto"
import { useNavigate } from "react-router-dom"
import LineChart from "@components/LineChart/LineChart"
Chart.register(CategoryScale)

const VaultCard = ({ title, bg, hoverBg, icon, id }) => {
  const navigate = useNavigate()
  function handleClick() {
    navigate(`/vault/${id}`)
  }

  return (
    <div
      className={`vault-card flex flex-col w-full border rounded-lg border-slate-500 cursor-pointer overflow-hidden ${hoverBg}`}
      onClick={handleClick}
    >
      <div className={`vault-card-top w-full h-1/3 bg-slate-600 relative p-5 ${bg}`}>
        <div className="vault-card-header">
          <button className="btn font-medium px-2 py-2 rounded-sm uppercase text-xs tracking-wider">Void 1</button>
        </div>
        <img src={icon} alt={icon} className="w-12 h-12 absolute left-5 -bottom-6" />
      </div>
      <div className="vault-card-bottom pt-10 px-5 flex flex-col justify-between flex-1 pb-5">
        <h3 className="vault-card-title font-medium text-2xl">{title}</h3>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 project-yeild ">
            <label className="text-xs text-slate-500">Total Yield (APY)</label>
            <p className="font-medium text-2xl">57.39%</p>
          </div>
          <div className="w-20">
            <LineChart
              showGrid={false}
              showXaxis={false}
              showYaxis={false}
              showLegend={false}
              chartData={{
                labels: ["Jun", "Jul", "Aug", "Sep"],
                datasets: [
                  {
                    id: 1,
                    data: [1, 50, 2, 100],
                    tension: 0.4,
                    backgroundColor: "#16BE76",
                    borderColor: "#16BE76",
                    pointRadius: 0
                    // the rest props...
                  }
                ]
              }}
              label="BTC/USDT"
            />
          </div>
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
        <div className="relative">
          <div className="percent w-1/4 bg-white h-1 absolute top-0 z-10"></div>
          <div className="capacity w-full h-1 absolute top-0"></div>
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

VaultCard.propTypes = {
  title: PropTypes.string,
  bg: PropTypes.string,
  hoverBg: PropTypes.string,
  icon: PropTypes.string
}

export default VaultCard
