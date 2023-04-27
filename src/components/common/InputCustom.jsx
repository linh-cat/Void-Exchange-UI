import React, { useState } from "react";
import "./InputCustom.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
const InputCustom = ({
  label,
  tooltip,
  leftSide,
  placeHolder,
  className,
  showBalance,
  rightAction,
  classNameInput,
  showMaxBtn,
  showUsd,
}) => {
  const [value, setValue] = useState("");

  return (
    <div
      className={`${className} input-custom flex flex-col gap-y-1 w-full h-full`}
    >
      <div className="title flex items-center gap-x-1">
        <label className="text-sm">{label}</label>
        <div className="group-tooltip">
          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
          <div className="tooltip p-3 rounded">{tooltip}</div>
        </div>
        {showUsd && value && (
          <div
            className="text-xs 
           text-zinc-500 usd"
          >
            ~$27.000
          </div>
        )}
      </div>
      <div className="flex h-full items-center bg-input rounded pl-1 pr-1">
        {leftSide && <div className="left-action">{leftSide}</div>}
        <input
          type="number"
          className={`${classNameInput} rounded w-full h-full text-xs lg:text-sm`}
          placeholder={placeHolder}
          onChange={(e) => setValue(e.target.value)}
        />

        {showMaxBtn && (
          <label className="font-very-small cursor-pointer max-btn border rounded-md p-2">
            Max
          </label>
        )}
      </div>

      {showBalance && (
        <label className="text-xs lg:text-sm text-zinc-500 balance">
          500000 ETC
        </label>
      )}
    </div>
  );
};

export default InputCustom;
