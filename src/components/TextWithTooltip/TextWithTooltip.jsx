import React from "react"
import cx from "classnames"

import "./TextWithTooltip.css"

const TextWithTooltip = ({ tooltip, text, classNameTooltip, className }) => {
  return (
    <div className={cx("relative text-with-tooltip")}>
      <h5 className={cx("dotted-underline text-slate-500 cursor-pointer", className)}>{text}</h5>
      <div className={cx("tooltip card absolute left-0 shadow px-2 py-3 rounded", classNameTooltip)}>{tooltip}</div>
    </div>
  )
}

export default TextWithTooltip
