import React from "react";
import SelectCustom from "../../components/common/SelectCustom";
import InputCustom from "../../components/common/InputCustom";
import "./OrderBox.css";
import SliderLeverage from "../../components/common/SliderLeverage";
import SelectToken from "../../components/common/SelectToken";
import BTC from "../../img/btc.png";
import BNB from "../../img/CAKE.png";
import ETH from "../../img/WETH.png";
import SlippageCustom from "../../components/common/SlippageCustom";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <div className="grid grid-cols-2 gap-2">
        <SelectCustom
          label="Order Type"
          options={[
            { label: "Limit order", value: "limit" },
            { label: "Market order", value: "market" },
          ]}
          defaultValue="limit"
        />
        <div className="h-2">
          <InputCustom label="Price" placeHolder={"0.0"} />
        </div>
      </div>
      <div className="mt-3">
        <InputCustom
          label="Pay"
          rightAction={
            <SelectToken
              options={[
                { label: "BTC", value: "BTC", icon: BTC },
                { label: "BNB", value: "BNB", icon: BNB },
                { label: "ETH", value: "ETH", icon: ETH },
              ]}
              defaultValue={"BTC"}
            />
          }
          placeHolder={"0.0"}
        />
      </div>
      <div className="mt-3">
        <InputCustom
          label="Position Size"
          rightAction={
            <SelectToken
              options={[
                { label: "BTC", value: "BTC", icon: BTC },
                { label: "BNB", value: "BNB", icon: BNB },
                { label: "ETH", value: "ETH", icon: ETH },
              ]}
              defaultValue={"BNB"}
            />
          }
          placeHolder={"0.0"}
        />
      </div>
      <div className="mt-3">
        <SliderLeverage label="Leverage" />
      </div>
      <div className="mt-10 w-full">
        <button className="default-btn w-full ">Approve</button>
      </div>
      <div className="mt-3">
        <SlippageCustom
          label="Slippage"
          options={[
            { label: "0.1", value: 0.1 },
            { label: "0.2", value: 0.2 },
            { label: "0.3", value: 0.3 },
          ]}
          defaultValue={0.1}
        />
      </div>
      <div className="mt-3">
        <div className="collateral-asset flex justify-between text-sm">
          <label>Collateral Asset</label>
          <div className="flex items-center gap-1">
            <img src={BNB} className="rounded-full w-5 h-5" alt="icon" />
            <span>Cake</span>
          </div>
        </div>
        <div className="collateral-value flex justify-between mt-2 text-sm">
          <label>Collateral Value</label>
          <div className="">
            <span>-</span>
          </div>
        </div>
        <div className="collateral-leverage flex justify-between mt-2 text-sm">
          <label>Leverage</label>
          <div className="">
            <span>-</span>
          </div>
        </div>
        <div className="entry-price flex justify-between mt-2 text-sm">
          <label>Entry Price</label>
          <div className="">
            <span>-</span>
          </div>
        </div>
        <div className="liquidation flex justify-between mt-2 text-sm">
          <label>Liquidation</label>
          <div className="">
            <span>-</span>
          </div>
        </div>
        <div className="w-full h-1 bg-slate-400 mt-3"></div>
        <div className="mt-3">
          <title>Market Infor</title>
          <div className="borrow-fee mt-2 flex justify-between items-center text-sm">
            <label>Borrow Fee</label>
            <span>0.00086% per hour</span>
          </div>
          <div className="available-liquidity mt-2 flex justify-between items-center text-sm">
            <label className="">Available Liquidity</label>
            <span className="text-zinc-500">17,050 Cake ~ $57</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
