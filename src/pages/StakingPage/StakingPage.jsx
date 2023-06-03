import Card from "@components/Card/Card"
import React, { useState } from "react"
import cx from "classnames"

import Mobo from "@img/morpho.png"
import { VoidIcon } from "@icons/index"
import { InputCustom } from "@components/common"
import Button from "@components/Button/Button"

const StakingPage = () => {
  const [timeStake, setTimeStake] = useState(7)
  const onClickTimeStake = (time) => {
    setTimeStake(time)
  }
  return (
    <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5">
      <div
        className="bg-cover blur-3xl bg-center w-full h-6 absolute top-40 right-28"
        style={{ backgroundImage: `url(${Mobo})` }}
      ></div>
      <Card className="w-full p-5">
        <div className="flex flex-col gap-3 ">
          <div className="title flex items-center gap-3">
            <img src={VoidIcon} alt="eth" className="h-10 w-10" />
            <h1 className="text-2xl">Void Exchange Staking</h1>
          </div>
          <div className="text-zinc-500 text-sm">
            AAVE holders (Ethereum network only) can stake their AAVE in the Safety Module to add more security to the
            protocol and earn Safety Incentives. In the case of a shortfall event, up to 30% of your stake can be
            slashed to cover the deficit, providing an additional layer of protection for the protocol. Learn more about
            risks involved
          </div>
        </div>
      </Card>
      <div>
        <Card
          header={
            <div className="px-4 py-2 font-medium text-lg grid grid-cols-1 md:grid-cols-4">
              <div className="flex flex-col justify-center items-center">
                <div className="">$63,939,379</div>
                <label className="text-slate-500 text-sm">Total Value Locked</label>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="">136.99%</div>
                <label className="text-slate-500 text-sm">APY</label>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="">$100.000</div>
                <label className="text-slate-500 text-sm">Total Ballance</label>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="">150.70 USDT</div>
                <label className="text-slate-500 text-sm">Total Stake</label>
              </div>
            </div>
          }
        >
          <div className="p-4 flex gap-3">
            <div className="flex flex-col gap-5 w-1/2 relative">
              <div
                className="bg-cover blur-3xl bg-center w-full h-6 absolute top-1/2 right-0 bg-opacity-10"
                style={{ backgroundImage: `url(${Mobo})` }}
              ></div>
              <Card header={<h3 className="p-3">Clain and Unstake</h3>}>
                <div className="p-3">
                  <div className="py-2">You can unstake and claim here</div>
                  <div className="flex gap-3">
                    <Card className="w-1/2">
                      <div className="p-3 flex flex-col gap-3">
                        <div className="flex flex-col justify-center items-center">
                          <label className="text-sm text-slate-500">Staked Void</label>
                          <div>0 ~ $0</div>
                        </div>
                        <div>
                          <Button text="Cooldown to unstake" />
                        </div>
                        <div className="flex justify-between">
                          <label className="text-sm text-slate-500">Cooldown period</label>
                          <div>20d</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="w-1/2">
                      <div className="p-3 flex flex-col gap-3">
                        <div className="flex flex-col justify-center items-center">
                          <label className="text-sm text-slate-500">Claimable Void</label>
                          <div>0 ~ $0</div>
                        </div>
                        <div>
                          <Button text="Claim Void" />
                        </div>
                        <div className="flex justify-between">
                          <label className="text-sm text-slate-500">Void per month</label>
                          <div>20</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-1/2">
              <Card header={<h3 className="p-3">Staking Now</h3>}>
                <div className="p-3 flex flex-col gap-3">
                  <div>
                    <InputCustom
                      classNameInput="px-1 py-3"
                      placeHolder="0"
                      label={<label className="text-slate-500">Stake</label>}
                      rightAction={<div className="text-sm mr-1 cursor-pointer">Max</div>}
                      showBalance={
                        <label className="text-xs lg:text-sm text-zinc-500 balance">Ballance: 100000 ETC</label>
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <InputCustom
                        classNameInput="px-1 py-3"
                        placeHolder="7 Days"
                        label={<label className="text-slate-500">Lock Period</label>}
                      />
                    </div>
                    <div className="flex gap-3">
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 7
                        })}
                        onClick={() => onClickTimeStake(7)}
                      >
                        7 Days
                      </div>
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 14
                        })}
                        onClick={() => onClickTimeStake(14)}
                      >
                        14 Days
                      </div>
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 30
                        })}
                        onClick={() => onClickTimeStake(30)}
                      >
                        30 Days
                      </div>
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 60
                        })}
                        onClick={() => onClickTimeStake(60)}
                      >
                        60 Days
                      </div>
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 100
                        })}
                        onClick={() => onClickTimeStake(100)}
                      >
                        100 Days
                      </div>
                      <div
                        className={cx({
                          "border text-center py-2 rounded text-sm cursor-pointer w-1/6": true,
                          active: timeStake === 150
                        })}
                        onClick={() => onClickTimeStake(150)}
                      >
                        150 Days
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StakingPage
