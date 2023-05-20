import React from "react"
import cx from "classnames"
import "./Button.css"

const Button = ({ text, className, isDefault = true, icon }) => {
  return (
    <div
      className={cx(className, {
        "text-center text-sm btn flex items-center justify-center gap-2 cursor-pointer py-2 px-3": true,
        "default-btn": isDefault
      })}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default Button
