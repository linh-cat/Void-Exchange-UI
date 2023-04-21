import React from "react";
import "./InputComponent.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
const InputComponent = ({ label, tooltip, rightAction }) => {
  return (
    <div className="input-custom flex flex-col gap-y-1 w-full h-full">
      <div className="title flex items-center gap-x-1">
        <label className="text-sm">{label}</label>
        <div className="group-tooltip">
          <QuestionMarkCircleIcon className="w-4 h-4 question text-slate-500" />
          <div className="tooltip p-3 rounded">{tooltip}</div>
        </div>
      </div>
      <input
        type="text"
        className="border border-gray-700 bg-slate-900 rounded w-full h-full"
      />
      {rightAction && <div></div>}
    </div>
  );
};

export default InputComponent;
