import React from "react"
import SelectCoupleToken from "../../components/common/SelectCoupleToken"
import BTC from "../../img/btc.png"
import ETH from "../../img/WETH.png"
import Up from "../../img/up.svg"
import Badge from "../../components/common/Badge"

const InforBarChar = () => {
  return (
    <div className="top-chart w-full h-full flex flex-col lg:flex-row md:gap-5 lg:items-center">
      <div className="h-full flex justify-between items-center px-3 lg:gap-3">
        <div>
          <SelectCoupleToken
            options={[
              {
                label: "BTC/USDT",
                value: "BTC/USDT",
                icon: BTC,
                price: "$27.000",
                dayChange: "0.18%"
              },
              {
                label: "ETH/USDT",
                value: "ETH/USDT",
                icon: ETH,
                price: "$1.000",
                dayChange: "0.1%"
              }
            ]}
            defaultValue={"BTC/USDT"}
          />
        </div>
        <div className="top-chart-price">
          <label className="text-xl green-up">$27,382.31</label>
        </div>
      </div>
      <div className="group-infor">
        <div className="grid grid-cols-4 sm:grid-cols-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <label className="text-slate-500 font-very-small">24h Change %</label>
            <div className="flex items-center gap-x-1">
              <img src={Up} alt="up" />
              <span className="inline green-up font-small">0.34%</span>
            </div>
          </div>
          <div className="">
            <label className="text-slate-500 font-very-small">24h Change</label>
            <div className="green-up font-small">$163.72</div>
          </div>
          <div className="">
            <label className="text-slate-500 font-very-small">24h High</label>
            <div className="font-small">$27,567.32 </div>
          </div>
          <div className="">
            <label className=" text-slate-500 font-very-small">24h Low</label>
            <div className="font-small">$27,033.61</div>
          </div>
          <div className="">
            <label className="text-slate-500 font-very-small">Volume</label>
            <div className="font-small flex justify-center items-center gap-1">
              <div>55.003</div>
              <Badge text="BTC" />
            </div>
          </div>
          <div className="">
            <label className="text-slate-500 font-very-small">Volume</label>
            <div className="font-small">$1,505,660</div>
          </div>
          <div className="">
            <label className="text-slate-500 font-very-small">Next Fund Rate</label>
            <div className="red-down font-small">-0.00013%</div>
          </div>
          <div className="">
            <label className=" text-slate-500 font-very-small">Countdown</label>
            <div className="font-small">00:46:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InforBarChar
