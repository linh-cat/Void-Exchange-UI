import React from "react";
import SelectToken from "../../components/common/SelectToken";
import "./OrderBox.css";
import BTC from "../../img/btc.png";
import BNB from "../../img/CAKE.png";
import ETH from "../../img/WETH.png";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <div className="test">
        <SelectToken
          options={[
            { label: "BTC", value: "BTC", icon: BTC },
            { label: "BNB", value: "BNB", icon: BNB },
            { label: "ETH", value: "ETH", icon: ETH },
          ]}
          defaultValue={"BTC"}
        />
      </div>
    </div>
  );
};

export default OrderBox;
