import LineChart from "@components/LineChart/LineChart"
import React, { useState } from "react"
import cx from "classnames"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import Button from "@components/Button/Button"
import { ETH } from "@img/token"
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
            <CardWrapper>
              <div className="deposit-card p-5 w-full border rounded flex flex-col gap-3">
                <div className="btn-group flex border rounded overflow-hidden w-full">
                  <div
                    className={cx({
                      "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                      "active-tab": tab === "deposit"
                    })}
                    onClick={() => onChangeTab("deposit")}
                  >
                    Deposit
                  </div>
                  <div
                    className={cx({
                      "w-1/2 text-center py-2 text-sm cursor-pointer tracking-wider": true,
                      "active-tab": tab === "withdraw"
                    })}
                    onClick={() => onChangeTab("withdraw")}
                  >
                    Withdraw
                  </div>
                </div>
                {tab === "deposit" && (
                  <>
                    <div className="flex flex-col gap-3 border p-3 rounded">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Currency</label>
                        <div className="flex gap-3">
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">50%</div>
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">MAX</div>
                        </div>
                      </div>
                      <div className="token flex gap-2 justify-between">
                        <div className="flex gap-2 items-center border py-1 px-2 rounded-3xl">
                          <img src={ETH} alt="ETH" className="w-5 h-5" />
                          <label className="">ETH</label>
                        </div>
                        <input type="number" className="p-0 flex-1 text-right" placeholder="0" />
                      </div>
                      <div className="ballance flex items-center gap-2">
                        <label className="text-sm">Ballance:</label>
                        <div>0</div>
                      </div>
                    </div>
                    <Button className="py-1 tracking-wider rounded" text="Add Liquidity" />
                  </>
                )}
                {tab === "withdraw" && (
                  <>
                    <div className="flex flex-col gap-3 border p-3 rounded">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">Currency</label>
                        <div className="flex gap-3">
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">50%</div>
                          <div className="text-xs bg-slate-500 text-center px-2 py-1 rounded cursor-pointer">MAX</div>
                        </div>
                      </div>
                      <div className="token flex gap-2 justify-between">
                        <div className="flex gap-2 items-center border py-1 px-2 rounded-3xl">
                          <img src={ETH} alt="ETH" className="w-5 h-5" />
                          <label className="">ETH</label>
                        </div>
                        <input type="number" className="p-0 flex-1 text-right" placeholder="0" />
                      </div>
                      <div className="ballance flex items-center gap-2">
                        <label className="text-sm">Ballance:</label>
                        <div>0</div>
                      </div>
                    </div>
                    <Button className="py-2 tracking-wider rounded" text="Withdraw" />
                  </>
                )}
              </div>
            </CardWrapper>
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
