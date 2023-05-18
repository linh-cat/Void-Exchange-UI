import React, { useState } from "react"
import "./DetailVaultPage.css"
import ETH from "@img/WETH.png"
import cx from "classnames"

const DetailVaultPage = () => {
  const [tab, setTab] = useState("deposit")

  const onChangeTab = (val) => {
    setTab(val)
  }

  return (
    <div className="vault-detail">
      <div className="banner">
        <div className="container mx-auto max-w-3xl  flex justify-between items-center">
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
      <div className="container mx-auto max-w-5xl mt-10">
        <div className="card-deposit-vault w-full h-96 border border-slate-500 rounded overflow-hidden flex flex-col gap-5">
          <div className="card-header flex px-5 py-3 gap-20 border-b border-slate-700 ">
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
          <div className="deposit-card p-3 w-1/2 border rounded ml-3 flex flex-col gap-3">
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
  )
}

export default DetailVaultPage
