import React from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
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

const SliderLeverage = () => {
  return (
    <div className="w-full h-full slider-custom">
      <Slider
        className=""
        min={1.1}
        marks={leverageMarks}
        max={50}
        handle={handle}
      />
    </div>
  );
};

export default SliderLeverage;
