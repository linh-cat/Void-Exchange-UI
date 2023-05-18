import React, { useState } from "react"
import "./DetailVaultPage.css"
import ETH from "@img/WETH.png"
import cx from "classnames"
import LineChart from "@components/LineChart/LineChart"
import BarChart from "@components/BarChart/BarChart"

const DetailVaultPage = () => {
  const [tab, setTab] = useState("deposit")

  const onChangeTab = (val) => {
    setTab(val)
  }

  return (
    <div className="vault-detail">
      <div className="banner">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col gap-7 col-span-2 w-96">
            <h2 className="font-medium text-5xl">T-ETH-C</h2>
            <div className="capacity flex flex-col">
              <div className="current-deposit flex justify-between">
                <label className="text-slate-500">Current Vault Deposits</label>
                <div>95.25 WETH</div>
              </div>
              <div className="rank relative mt-3 mb-5">
                <div className="current absolute top-0 w-1/2 h-2 bg-white z-10"></div>
                <div className="max absolute top-0 w-full h-2 bg-white"></div>
              </div>
              <div className="max-vault flex justify-between">
                <label className="text-slate-500">Max Vault Capacity</label>
                <div>750.00 WETH</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={ETH} alt="eth" className="" />
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl mt-10">
        <div className="card-deposit-vault w-full border border-slate-500 rounded overflow-hidden flex flex-col">
          <div className="card-header grid grid-cols-2 md:grid-cols-4 px-5 py-3 border-b border-slate-700 ">
            <div className="currency">
              <label>USDT</label>
              <div className="text-slate-500">$1.00</div>
            </div>
            <div className="current-apy">
              <div>4.96%</div>
              <label className="text-sm text-slate-500">Current APY</label>
            </div>
            <div className="total-supply">
              <div>874,700 USDT</div>
              <label className="text-sm text-slate-500">Total Supplied</label>
            </div>
            <div className="total-borrow">
              <div>746,200 USDT</div>
              <label className="text-sm text-slate-500">Total Borrowed</label>
            </div>
          </div>
          <div className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="supply-liquidity-chart border border-slate-500 col-span-2 rounded">
              <LineChart
                chartData={{
                  labels: ["Utilization", "40%", "60%", "100%"],
                  datasets: [
                    {
                      id: 1,
                      label: "Supply APY",
                      data: [1, 40, 60, 100],
                      tension: 0.4,
                      backgroundColor: "#09a7eb",
                      borderColor: "#09a7eb"
                      // pointRadius: 0,
                      // pointHitRadius: 0,
                      // pointHoverRadius: 0
                    },
                    {
                      id: 1,
                      label: "Borrow APY",
                      data: [1, 20, 40, 90],
                      tension: 0.4,
                      backgroundColor: "#16BE76",
                      borderColor: "#16BE76"
                      // pointRadius: 0,
                      // pointHitRadius: 0,
                      // pointHoverRadius: 0
                    }
                  ]
                }}
                showYaxis={false}
                showGrid={false}
              />
            </div>
            <div className="deposit-card p-5 w-full border rounded flex flex-col gap-3">
              <div className="btn-group flex border rounded overflow-hidden">
                <div
                  className={cx({
                    "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                    active: tab === "deposit"
                  })}
                  onClick={() => onChangeTab("deposit")}
                >
                  Deposit
                </div>
                <div
                  className={cx({
                    "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                    active: tab === "withdraw"
                  })}
                  onClick={() => onChangeTab("withdraw")}
                >
                  Withdraw
                </div>
              </div>
              {tab === "deposit" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">Amount (ETH)</label>
                    <div>
                      <input className="border w-full p-3" />
                    </div>
                  </div>

                  <div className="text-sm flex justify-between text-slate-300">
                    <label>Wallet Balance</label>
                    <div>0 ETH</div>
                  </div>
                </div>
              )}
              {tab === "withdraw" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">Amount (ETH)</label>
                    <div>
                      <input className="border w-full p-3" />
                    </div>
                  </div>

                  <div className="text-sm flex justify-between text-slate-300">
                    <label>Instant withdraw limit</label>
                    <div>0 ETH</div>
                  </div>
                </div>
              )}
              {tab === "withdraw" && <button className="btn-add py-3 tracking-wider rounded">Withdraw</button>}
              {tab === "deposit" && <button className="btn-add py-3 tracking-wider rounded">Add Liquidity</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl mt-10">
        <div className="card-deposit-vault grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5 gap-5">
          <div className="xl:col-span-2 border border-slate-500 rounded">
            <BarChart showGrid={false} showLegend={false} showXaxis={false} showYaxis={false} />
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
    </div>
  )
}

export default DetailVaultPage
