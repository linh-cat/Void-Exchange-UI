import React, { useState } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "./SliderLeverage.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} x`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const leverageMarks = {
  2: "2x",
  5: "5x",
  10: "10x",
  15: "15x",
  20: "20x",
  25: "25x",
  30: "30x",
  35: "35x",
  40: "40x",
  45: "45x",
  50: "50x",
};

const SliderLeverage = ({ label, tooltip, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const onAfterChage = (amount) => {
    setValue(amount);
  };
  return (
    <div className="w-full h-full slider-custom flex flex-col gap-y-2">
      <div className="title flex items-center gap-x-1">
        <label className="text-sm">{label}</label>
        <div className="group-tooltip">
          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
          <div className="tooltip p-3 rounded">{tooltip}</div>
        </div>
      </div>
      <Slider
        min={1.1}
        marks={leverageMarks}
        max={50}
        handle={handle}
        onAfterChange={onAfterChage}
      />
    </div>
  );
};

export default SliderLeverage;
