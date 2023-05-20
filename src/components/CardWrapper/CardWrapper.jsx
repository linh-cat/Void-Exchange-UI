import React from "react"
import cx from "classnames"

const CardWrapper = ({ header, children, hasShadow, className }) => {
  return (
    <div
      className={cx(className, {
        "border border-s-slate-500 rounded flex flex-col": true,
        shadow: hasShadow
      })}
    >
      <div
        className={cx({
          "w-full": true,
          "border-b border-slate-700": header
        })}
      >
        {header}
      </div>
      <div className="flex-1 w-full">{children}</div>
    </div>
  )
}

export default CardWrapper
