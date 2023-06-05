import Card from "@components/Card/Card"
import React, { useState } from "react"
import cx from "classnames"

import Mobo from "@img/morpho.png"
import { VoidIcon } from "@icons/index"
import { InputCustom } from "@components/common"
import Button from "@components/Button/Button"
import { BTC } from "@img/token"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"

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
        <div className="grid lg:grid-cols-3 gap-3 z-50">
          <Card hasShadow={true}>
            <div className="py-5">
              <div className="flex flex-col justify-center items-center">
                <div className="">$63,939,379</div>
                <label className="text-slate-500 text-sm">Total Value Locked</label>
              </div>
            </div>
          </Card>
          <Card hasShadow={true}>
            <div className="py-5">
              <div className="flex flex-col justify-center items-center">
                <div className="">$63,939,379</div>
                <label className="text-slate-500 text-sm">APY</label>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <div className="flex gap-3 z-10 relative">
            <div className="w-1/3">
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
            <div className="flex flex-col gap-5 w-1/2 relative"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingPage
