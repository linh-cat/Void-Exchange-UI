import React from "react"
import cx from "classnames"
import "./Button.css"

const Button = ({ text, className }) => {
  return (
    <div
      className={cx(className, {
        "text-center default-btn": true
      })}
    >
      {text}
    </div>
  )
}

export default Button
