import LineChart from "@components/LineChart/LineChart"
import React, { useState } from "react"
import cx from "classnames"
import CardWrapper from "@components/CardWrapper/CardWrapper"
const SectionVaultDeposit = () => {
  const [tab, setTab] = useState("deposit")

  const onChangeTab = (val) => {
    setTab(val)
  }
  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <CardWrapper
        className="card-deposit-vault w-full overflow-hidden"
        header={
          <div className="card-header grid grid-cols-2 md:grid-cols-4 px-5 py-3 ">
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
        }
        hasShadow={true}
      >
        {/* bottom content */}
        <div className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
          <CardWrapper className="supply-liquidity-chart col-span-full lg:col-span-3">
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
          </CardWrapper>
          <div className="flex flex-col gap-3">
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
            {/* my positions */}
            <CardWrapper className="my-position p-3">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-slate-500">Portfolio Value</label>
                  <div>$7243.13</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Collateral</label>
                    <div>$3000</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Leverage</label>
                    <div>0.5x</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="text-xs text-slate-500">Total Unrealized P&L</label>
                    <div className="green-up">+21.04</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Total Realized P&L</label>
                    <div className="green-up">+320</div>
                  </div>
                </div>
              </div>
            </CardWrapper>
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}

export default SectionVaultDeposit
