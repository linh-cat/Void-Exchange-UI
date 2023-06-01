import React from "react"
import cx from "classnames"

const Card = ({ header, children, hasShadow, className, style }) => {
  return (
    <div
      className={cx(className, {
        "border rounded flex flex-col": true,
        shadow: hasShadow
      })}
      style={style}
    >
      <div
        className={cx({
          "w-full": true,
          "border-b": header
        })}
      >
        {header}
      </div>
      <div className="flex-1 w-full">{children}</div>
    </div>
  )
}

export default Card
