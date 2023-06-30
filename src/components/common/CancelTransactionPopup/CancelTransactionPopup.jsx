import React, { useEffect, useState } from "react"
import cx from "classnames"
import { CancelIcon } from "@icons/index"

const CancelTransactionPopup = ({ body, duration, onClose, position = "center", header, isCancelIcon }) => {
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  if (!showPopup) {
    return null // Do not render the popup if showPopup is false
  }

  return (
    <div
      className={cx(
        "card shadow absolute w-96 rounded p-2 flex flex-col gap-2 text-sm transition-opacity z-50 border-red red-down",
        {
          "top-28 left-1/2 -translate-x-1/2": position === "center",
          "bottom-1 right-1": position === "bottom-right",
          "top-0 left-0": position === "top-left",
          "bottom-0 left-0": position === "bottom-left"
        }
      )}
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

export default CancelTransactionPopup
