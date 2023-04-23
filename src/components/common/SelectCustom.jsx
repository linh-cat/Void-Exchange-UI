import React, { useMemo, useState } from "react";
import "./SelectCustom.css";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import useOutsideDetect from "../../hooks/useOutsideDetect";

const SelectCustom = ({ options, defaultValue, label, tooltip, className }) => {
  const [openList, setOpenList] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const toggleOpen = () => {
    setOpenList(!openList);
  };

  const onChangeValue = (value) => {
    setValues(value);
    setOpenList(false);
  };
  const handleClickOutside = () => {
    setOpenList(false);
  };
  const refOutside = useOutsideDetect(handleClickOutside);

  const renderValue = useMemo(() => {
    const index = options.findIndex((item) => item.value === values);
    return options[index]?.label;
  }, [options, values]);

  return (
    <div className={`${className} select-custom flex flex-col gap-y-1`}>
      <div className="flex items-center gap-1">
        <label className="text-sm">{label}</label>
        <div className="group-tooltip">
          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
          <div className="tooltip p-3 rounded">{tooltip}</div>
        </div>
      </div>

      <div className="dd-wrapper">
        <div
          className="dd-header border rounded w-full p-2 cursor-pointer flex items-center justify-between"
          onClick={toggleOpen}
          ref={refOutside}
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
                className="dd-list-item p-2 cursor-pointer text-sm"
                onClick={() => onChangeValue(op.value)}
              >
                {op.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCustom;
