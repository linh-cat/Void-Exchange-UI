import React from "react";
import SelectCustom from "../../components/common/SelectCustom";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <SelectCustom
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ]}
        defaultValue={"1"}
      />
    </div>
  );
};

export default OrderBox;
