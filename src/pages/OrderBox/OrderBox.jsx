import React from "react";
import SelectCustom from "../../components/common/SelectCustom";
import "./OrderBox.css";
import SliderLeverage from "../../components/common/SliderLeverage";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      {/* <div className="test"> */}
      {/* <SelectCustom
          options={[
            { label: "Limit", value: "limit" },
            { label: "Market", value: "market" },
          ]}
          label="Order Type"
          defaultValue={"limit"}
        /> */}
      <SliderLeverage
        label="Leverage"
        tooltip="This is leverage"
        defaultValue={1.1}
      />
      {/* </div> */}
    </div>
  );
};

export default OrderBox;
