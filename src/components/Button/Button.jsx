import React from "react"
import cx from "classnames"
import "./Button.css"

const Button = ({ text, className, isDefault = true, icon, onClick }) => {
  return (
    <div
      className={cx(className, {
        "text-center text-sm btn flex items-center justify-center gap-2 cursor-pointer rounded overflow-hidden": true,
        "default-btn": isDefault
      })}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default Button
