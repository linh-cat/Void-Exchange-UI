import React from "react"

import { useNavigate } from "react-router-dom"
import Chart, { CategoryScale } from "chart.js/auto"
import PropTypes from "prop-types"
import cx from "classnames"

import LineChart from "@components/LineChart/LineChart"

import "./VaultCard.css"

Chart.register(CategoryScale)

const VaultCard = ({ title, bg, hoverBg, icon, id, backedByIcon, risk, badge }) => {
  const navigate = useNavigate()
  function handleClick() {
    navigate(`/vault/${id}`)
  }

  return (
    <div
      className={`vault-card flex flex-col w-full border rounded-lg cursor-pointer overflow-hidden ${hoverBg}`}
      onClick={handleClick}
    >
      <div className={`vault-card-top w-full h-1/3 bg-slate-600 relative p-5 ${bg}`}>
        <div className="vault-card-header">
          {badge.map((b, idx) => (
            <button className="btn font-medium px-2 py-2 rounded-sm uppercase text-xs tracking-wider" key={idx}>
              {b}
            </button>
          ))}
        </div>
        <img src={icon} alt={icon} className="w-12 h-12 absolute left-5 -bottom-6" />
      </div>
      <div className="vault-card-bottom pt-10 px-5 flex flex-col justify-between flex-1 pb-5">
        <div className="flex items-end justify-between gap-2">
          <div className="font-medium text-2xl">{title}</div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-slate-500 text-xs">Backed by</span>
            <img src={backedByIcon ?? icon} alt="icon" className="w-5 h-5" />
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-2 project-yeild ">
            <h3 className="text-xs text-slate-500">Total Yield (APY)</h3>
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
        <div className="flex items-center justify-between">
          <h3 className="text-sm">Risk</h3>
          <div
            className={cx(
              {
                "bg-successLight text-green text-success": risk === "low",
                "bg-errorLight text-green text-error": risk === "high",
                "bg-pending text-pending": risk === "medium"
              },
              "py-1 px-2 rounded capitalize text-xs"
            )}
          >
            {risk}
          </div>
        </div>

        <div className="weekly-strike flex justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-slate-500">Utilization</h3>
            <p className="text-sm">40%</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-slate-500">Total deposits</h3>
            <p className="text-sm">4,155.41 ETH</p>
          </div>
        </div>
        <div className="relative">
          <div className="percent w-1/4 bg-white h-1 absolute top-0 z-10"></div>
          <div className="capacity w-full h-1 absolute top-0"></div>
        </div>
        <div className="deposit-cap flex justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-slate-500">Open Interest</h3>
            <p className="text-sm">$3,259,618.00</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-slate-500">Total Reserve</h3>
            <p className="text-sm">$8,256,721.00</p>
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
