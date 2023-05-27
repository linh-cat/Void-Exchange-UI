import React from "react"

const SwitchButton = ({ label, className, onChange, value }) => {
  return (
    <div className={`${className} flex`}>
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={value} readOnly />
        <div
          onClick={onChange}
          className="w-11 h-6 border rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:bg-white after:bg-slate-500 after:border-slate-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all "
        ></div>
        {label && <span className="ml-2 text-sm">{label}</span>}
      </label>
    </div>
  )
}

export default SwitchButton
