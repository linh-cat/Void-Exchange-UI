import React, { useMemo, useState } from "react";
import "./SlippageCustom.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import useOutsideDetect from "../../hooks/useOutsideDetect";

const SlippageCustom = ({ label, options, tooltip, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [pickValue, setPickValue] = useState();

  const handleClickOutside = () => {
    setOpen(false);
  };
  const refOutside = useOutsideDetect(handleClickOutside);

  const onChangeValue = (val) => {
    setValue(val);
    setPickValue();
    setOpen(!open);
  };
  const onChangePickValue = (e) => {
    e.preventDefault();
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setPickValue(value);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const renderValue = useMemo(() => {
    const index = options.findIndex((item) => item.value === value);
    return options[index]?.label;
  }, [options, value]);

  return (
    <div className="slippage-custom">
      <div className="slippage-custom-label flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <label>{label}</label>
          <div className="group-tooltip">
            <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
            <div className="tooltip p-3 rounded">{tooltip}</div>
          </div>
        </div>
        <div
          className="rounded border px-2 py-1 cursor-pointer"
          onClick={toggleOpen}
          ref={refOutside}
        >
          {pickValue || renderValue}%
        </div>
      </div>
      <div className={`${open ? "open" : "close"} slippage-dd p-3 rounded`}>
        <h3 className="slippage-dd-title">Setting slippage</h3>
        <div className="slippage-dd-list grid grid-cols-4 gap-2 mt-2 ">
          {options.map((item, idx) => (
            <div
              className="slippage-dd-item rounded border text-center cursor-pointer py-1"
              key={idx}
              onClick={() => onChangeValue(item.value)}
            >
              {item.label} %
            </div>
          ))}
          <div className="slippage-dd-item rounded border text-center flex items-center px-1">
            <input
              value={pickValue}
              type="number"
              className="w-full"
              placeholder="0."
              onChange={onChangePickValue}
            />
            <div>%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlippageCustom;
