import React from "react"
import cx from "classnames"
import "./Button.css"

const Button = ({ text, className, isDefault = true, icon, onClick, type }) => {
  return (
    <div
      className={cx(className, {
        "text-center btn text-sm flex items-center justify-center gap-2 cursor-pointer rounded overflow-hidden": true,
        "default-btn ": isDefault,
        secondary: type === "secondary"
      })}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      <div>{text}</div>
    </div>
  )
}

export default Button
