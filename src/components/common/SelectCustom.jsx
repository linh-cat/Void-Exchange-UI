import React, { useMemo, useState } from "react";
import "./SelectCustom.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const SelectCustom = ({ options, defaultValue }) => {
  const [openList, setOpenList] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const toggleOpen = () => {
    setOpenList(!openList);
  };

  const onChangeValue = (value) => {
    setValues(value);
    setOpenList(false);
  };

  const renderValue = useMemo(() => {
    const index = options.findIndex((item) => item.value === values);
    return options[index]?.label;
  }, [options, values]);

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header border rounded w-full p-2 cursor-pointer flex items-center justify-between"
        onClick={toggleOpen}
      >
        <label className="dd-header-title">{renderValue}</label>
        {openList ? (
          <ChevronUpIcon className="w-3 h-3" />
        ) : (
          <ChevronDownIcon className="w-3 h-3" />
        )}
      </div>
      <div
        className={`${
          openList ? "open" : "close"
        } dd-list round-b w-full h-full`}
      >
        {options?.map((op, idx) => (
          <div key={idx}>
            <div
              className="dd-list-item p-2 cursor-pointer"
              onClick={() => onChangeValue(op.value)}
            >
              {op.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCustom;
