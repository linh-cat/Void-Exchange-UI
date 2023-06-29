import React from "react"
import cx from "classnames"
import "./Button.css"
import Spinner from "@components/Spinner/Spinner"

const Button = ({ text, className, isDefault = true, icon, onClick, type, isLoading = false, disabled = false }) => {
  return (
    <div
      className={cx(className, {
        "text-center btn text-sm flex items-center justify-center gap-2 cursor-pointer rounded ": true,
        "default-btn py-2": isDefault,
        secondary: type === "secondary",
        disabled: isLoading || disabled
      })}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      {!isLoading && <div>{text}</div>}
      {isLoading && <Spinner />}
    </div>
  )
}

export default Button
