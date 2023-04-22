import React from "react";
import SelectCustom from "../../components/common/SelectCustom";
import "./OrderBox.css";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <div className="test">
        <SelectCustom
          options={[
            { label: "Limit", value: "limit" },
            { label: "Market", value: "market" },
          ]}
          label="Order Type"
          defaultValue={"limit"}
        />
      </div>
    </div>
  );
};

export default OrderBox;
