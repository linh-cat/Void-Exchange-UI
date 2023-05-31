import React from "react"
import cx from "classnames"
import "./Button.css"
import Spinner from "@components/Spinner/Spinner"

const Button = ({ text, className, isDefault = true, icon, onClick, type, isLoading = false }) => {
  return (
    <div
      className={cx(className, {
        "text-center btn text-sm flex items-center justify-center gap-2 cursor-pointer rounded overflow-hidden": true,
        "default-btn ": isDefault,
        secondary: type === "secondary"
      })}
      onClick={!isLoading ? onClick : () => {}}
    >
      {icon && <div>{icon}</div>}
      {!isLoading && <div>{text}</div>}
      {isLoading && <Spinner />}
    </div>
  )
}

export default Button
