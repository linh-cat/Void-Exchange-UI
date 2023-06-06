import Card from "@components/Card/Card"
import React, { useState } from "react"
import cx from "classnames"

import Mobo from "@img/morpho.png"
import { DBIcon, VoidIcon } from "@icons/index"
import { InputCustom } from "@components/common"
import Button from "@components/Button/Button"
import { BTC, ETH } from "@img/token"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { Rewards } from "@img/logo"

const StakingPage = () => {
  return (
    <div className="">
      <div className="bg vh-full-screen fixed"></div>
      <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5 bg-transparent">
        <Card className="w-full p-5 relative" hasShadow={true}>
          <div className="flex flex-col gap-3">
            <div className="title flex items-center gap-3">
              <img src={VoidIcon} alt="eth" className="h-10 w-10" />
              <h1 className="text-2xl">Void Exchange Staking</h1>
            </div>
            <div className="text-sm text-slate-300">
              AAVE holders (Ethereum network only) can stake their AAVE in the Safety Module to add more security to the
              protocol and earn Safety Incentives. In the case of a shortfall event, up to 30% of your stake can be
              slashed to cover the deficit, providing an additional layer of protection for the protocol. Learn more
              about risks involved
            </div>
          </div>
        </Card>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 z-10 relative">
            <div className="col-span-1">
              <Card header={<h3 className="p-3">Create Stake</h3>} hasShadow={true}>
                <div className="p-3 flex flex-col gap-3">
                  <div className="border p-3 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex gap-1">
                          <label className="text-sm text-slate-500">Stake Amount</label>
                          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500 cursor-pointer" />
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">Max: 0.0</div>
                    </div>
                    <div>
                      <InputCustom
                        placeHolder="0"
                        classNameInput="py-2 px-1 border-0"
                        rightAction={
                          <div className="flex gap-1 items-center mr-2">
                            <img src={BTC} className="h-5 w-5" alt="btc" />
                            <label className="text-xs">BTC</label>
                          </div>
                        }
                        isBorder={false}
                      />
                    </div>
                    <div className="grid grid-cols-4 text-center gap-3">
                      <div className="border rounded py-1 cursor-pointer active text-slate-400">25%</div>
                      <div className="border rounded py-1 cursor-pointer text-slate-400">50%</div>
                      <div className="border rounded py-1 cursor-pointer text-slate-400">75%</div>
                      <div className="border rounded py-1 cursor-pointer text-slate-400">100%</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <InputCustom
                        classNameInput="px-1 py-3"
                        placeHolder="7 Days"
                        label={<label className="text-slate-500">Lock Period</label>}
                      />
                    </div>

                    <div>
                      <Button text="Stake" className="py-2 active" isDefault={false} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-5 md:col-span-2 relative">
              <Card>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <img src={Rewards} alt="rewards" className="w-12 h-12" />
                    <div>
                      <label className="font-medium text-lg">Void Rewards</label>
                      <div className="text-slate-500 text-sm">Clainming Rewards</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="">
                      <div className="flex flex-col justify-center items-center">
                        <label className="text-slate-500 text-sm">Total Value Locked</label>
                        <div className="">$63,939,379</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex flex-col justify-center items-center">
                        <label className="text-slate-500 text-sm">APY</label>
                        <div className="">$63,939,379</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-3">
                <Card className="">
                  <div className="p-3 flex flex-col gap-3">
                    <label>Your Staking Stats</label>
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Card hasShadow={true}>
                          <div className="flex flex-col gap-2 p-3">
                            <img src={BTC} className="w-5 h-5" alt="wbtc" />
                            <div className="text-right">
                              <div>0.0</div>
                              <label className="text-slate-500 text-sm">vVoid Balance</label>
                            </div>
                          </div>
                        </Card>
                        <Card hasShadow={true}>
                          <div className="flex flex-col gap-2 p-3">
                            <img src={ETH} className="w-5 h-5" alt="weth" />
                            <div className="text-right">
                              <div>0.0</div>
                              <label className="text-slate-500 text-sm">vVoid Balance</label>
                            </div>
                          </div>
                        </Card>
                      </div>
                      <Card hasShadow={true}>
                        <div className="p-3 grid grid-cols-2 gap-3">
                          <div className="text-xs text-slate-500 border-r pt-3">
                            Earn up to 35% rebates from the referral program.{" "}
                            <span className="underline">Learn more</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <img src={DBIcon} alt="db" className="w-5 h-5" />
                            <div className="text-xs text-right">
                              <div className="text-blue-500">Create Code</div>
                              <div>Your Rebate Rate</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-3 flex flex-col justify-between gap-3">
                    <div>
                      <label>Total Rewards</label>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-slate-500">Total</label>
                          <div>$0.00</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-slate-500">Void Token</label>
                          <div>0.00</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button text="Claim Rewards On Void Exchange" isDefault={false} className="border py-3 active" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingPage
