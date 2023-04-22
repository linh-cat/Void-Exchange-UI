import React from "react";
import SelectToken from "../../components/common/SelectToken";
import "./OrderBox.css";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <div className="test">
        <SelectToken
          options={[
            { label: "BTC", value: "BTC" },
            { label: "BNB", value: "BNB" },
            { label: "ETH", value: "ETH" },
          ]}
          defaultValue={"BTC"}
        />
      </div>
    </div>
  );
};

export default OrderBox;
