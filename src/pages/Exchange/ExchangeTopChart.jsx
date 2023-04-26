import React from "react";
import SelectCoupleToken from "../../components/common/SelectCoupleToken";
import BTC from "../../img/btc.png";
import ETH from "../../img/WETH.png";
import Up from "../../img/up.svg";

const ExchangeTopChart = () => {
  return (
    <div className="top-chart w-full h-full md:flex md:gap-5 items-center md:pl-3">
      <div className="h-full flex justify-between items-center md:gap-5 p-1">
        <div>
          <SelectCoupleToken
            options={[
              {
                label: "BTC/USDT",
                value: "BTC/USDT",
                icon: BTC,
                price: "$27.000",
                dayChange: "0.18%",
              },
              {
                label: "ETH/USDT",
                value: "ETH/USDT",
                icon: ETH,
                price: "$1.000",
                dayChange: "0.1%",
              },
            ]}
            defaultValue={"BTC/USDT"}
          />
        </div>
        <div className="top-chart-price">
          <label className="text-xl green-up">$27,382.31</label>
        </div>
      </div>
      <div className="group-infor p-1 flex flex-col sm:flex-row gap-1 sm:gap-1 md:gap-2 lg:gap-5">
        <div className="flex justify-between items-center sm:gap-1 md:gap-2 lg:gap-5 xl:gap-6 2xl:gap-7">
          <div className="gap-1 font-very-small 2xl:text-base">
            <label className="text-slate-500">24h Change %</label>
            <div className="flex items-center gap-x-1">
              <img src={Up} alt="up" />
              <span className="inline green-up">0.34%</span>
            </div>
          </div>
          <div className="font-very-small 2xl:text-base">
            <label className="text-slate-500">24h Change</label>
            <div className="green-up">$163.72</div>
          </div>
          <div className="font-very-small 2xl:text-base">
            <label className=" text-slate-500">24h High</label>
            <div className="">$27,567.32 </div>
          </div>
          <div className="font-very-small 2xl:text-base">
            <label className=" text-slate-500">24h Low</label>
            <div className="">$27,033.61</div>
          </div>
        </div>
        <div className="flex justify-between items-center sm:gap-1 md:gap-2 lg:gap-5 xl:gap-6 2xl:gap-7">
          <div className="font-very-small 2xl:text-base">
            <label className="font-very-small text-slate-500">
              Volumn (BTC)
            </label>
            <div className="">55.003</div>
          </div>
          <div className="font-very-small 2xl:text-base">
            <label className=" text-slate-500">Volumn (USD)</label>
            <div className="">$1,505,660</div>
          </div>
          <div>
            <div className="flex">
              <div className="font-very-small 2xl:text-base">
                <label className="text-slate-500">Next Fund Rate</label>
                <div className="red-down">-0.00013%</div>
              </div>
              <div className="font-very-small 2xl:text-base">
                <label className=" text-slate-500">/ Countdown</label>
                <div className="">00:46:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeTopChart;
