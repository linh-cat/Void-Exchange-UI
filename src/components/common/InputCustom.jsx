import React from "react";
import "./InputCustom.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
const InputCustom = ({
  label,
  tooltip,
  rightAction,
  placeHolder,
  className,
  showBalance,
}) => {
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
      </div>
      <input
        type="number"
        className=".bg-input border border-gray-700  rounded w-full h-full text-lg"
        placeholder={placeHolder}
      />
      {showBalance && (
        <label className="text-xs lg:text-sm text-zinc-500 balance">
          Balance: 50 BNB
        </label>
      )}
      {rightAction && <div className="right-action">{rightAction}</div>}
    </div>
  );
};

export default InputCustom;
