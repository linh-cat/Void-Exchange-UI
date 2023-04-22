import React, { useMemo, useState } from "react";
import "./SelectToken.css";
import BTC from "../../img/btc.png";
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const SelectToken = ({ options, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const onChangeValue = (token) => {
    setValue(token);
    setOpen(!open);
  };

  const renderLabel = useMemo(() => {
    const index = options.findIndex((item) => item.value === value);
    return options[index]?.label;
  }, [value, options]);

  return (
    <div className={`dd-token`}>
      <div
        className="dd-token-label border border-gray-600 rounded-full cursor-pointer gap-1 flex items-center justify-around"
        onClick={toggleOpen}
      >
        <img className="rounded-full w-7 h-7  " src={BTC} alt="btc" />
        <label className="cursor-pointer">{renderLabel}</label>
        {open ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </div>
      <div className={`${open ? "open" : "close"} dd-token-list p-2 rounded`}>
        {options?.map((item) => (
          <div
            className="dd-token-item flex items-center justify-between w-full p-1"
            onClick={() => onChangeValue(item.value)}
          >
            <div className="flex items-center gap-2">
              <img className="rounded-full w-7 h-7" src={BTC} alt="btc" />
              <div className="text-sm">
                <label>{item.label}</label>
                <div className="balance">0</div>
              </div>
            </div>
            <div>
              <PlusCircleIcon className="w-5 h-5 plus" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectToken;
