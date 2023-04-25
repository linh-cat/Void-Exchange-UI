import React from "react";
import SelectCoupleToken from "../../components/common/SelectCoupleToken";
import BTC from "../../img/btc.png";
import ETH from "../../img/WETH.png";
import Up from "../../img/up.svg";

const ExchangeTopChart = () => {
  return (
    <div className="top-chart w-full h-full md:flex md:gap-5 items-center">
      <div className="h-full flex justify-between items-center md:gap-5 p-1">
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
        <div className="top-chart-price">
          <label className="text-xl">$27,382.31</label>
        </div>
      </div>
      <div className="group-infor flex justify-between md:gap-5 p-1">
        <div className="flex">
          <div>
            <label className="text-sm text-slate-500">24h Change</label>
            <div className="green-up font-small">$163.72</div>
          </div>
          <div className="flex items-center gap-1">
            <img src={Up} alt="up" />
            <span className="inline green-up font-small">0.34%</span>
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-500">24h High</label>
          <div className="font-small">$27,567.32 </div>
        </div>
        <div>
          <label className="text-sm text-slate-500">24h Low</label>
          <div className="font-small">$27,033.61</div>
        </div>
        <div className="hidden sm:block">
          <label className="text-sm text-slate-500">Volumn (BTC)</label>
          <div className="font-small">55.003</div>
        </div>
        <div className="hidden sm:block">
          <label className="text-sm text-slate-500">Volumn (USD)</label>
          <div className="font-small">$1,505,660</div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeTopChart;
