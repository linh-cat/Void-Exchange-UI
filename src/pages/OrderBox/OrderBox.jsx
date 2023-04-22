import React from "react";
import SelectCustom from "../../components/common/SelectCustom";
import "./OrderBox.css";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <div className="test">
        <SelectCustom
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
