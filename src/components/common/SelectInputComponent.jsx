import React from "react";
import "./SelectInputComponent.css";

const SelectInputComponent = ({ options, label }) => {
  return (
    <div>
      <div>{label}</div>
      <div className="select-custom">
        <div></div>
      </div>
    </div>
  );
};

export default SelectInputComponent;
