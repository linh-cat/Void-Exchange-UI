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
    </div>
  );
};

export default OrderBox;
