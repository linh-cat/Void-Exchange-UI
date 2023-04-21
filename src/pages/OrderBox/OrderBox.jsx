import React from "react";
import SelectInputComponent from "../../components/common/SelectInputComponent";

const OrderBox = ({ type }) => {
  return (
    <div className="order-box">
      <SelectInputComponent label="Type order" />
    </div>
  );
};

export default OrderBox;
