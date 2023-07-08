import React from "react"
import "./Badge.css"
import cx from "classnames"

const Badge = ({ text, type = "default" }) => {
  return (
    <span
      className={cx("text-xs mr-2 px-2 py-0.5 rounded-md badge capitalize", {
        default: type === "default",
        "short bg-errorLight text-error": type === "short",
        "long bg-successLight text-success": type === "long"
      })}
    >
      {text}
    </span>
  )
}

export default Badge
