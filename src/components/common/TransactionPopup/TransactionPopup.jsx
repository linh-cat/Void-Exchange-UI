import { CancelIcon } from "@icons/index"
import React, { useEffect, useState } from "react"
import cx from "classnames"

const TransactionPopup = ({ body, duration, onClose, position = "center", header, isCancelIcon, type = "success" }) => {
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  if (!showPopup) {
    return null // Do not render the popup if showPopup is false
  }

  return (
    <div
      className={cx("card shadow absolute w-96 rounded p-2 flex flex-col gap-2 text-sm transition-opacity z-50", {
        "top-28 left-1/2 -translate-x-1/2": position === "center",
        "bottom-1 right-1": position === "bottom-right",
        "top-1 left-1": position === "top-left",
        "bottom-1 left-1": position === "bottom-left",
        "border-red text-error": type === "error",
        "border-green text-success": type === "success",
        "border-yellow text-pending": type === "warning"
      })}
    >
      {isCancelIcon && (
        <div className="flex justify-end">
          <img src={CancelIcon} className="w-4 h-4 cursor-pointer" alt="cancel icon" onClick={onClose} />
        </div>
      )}
      {header}
      {body}
    </div>
  )
}

export default TransactionPopup
