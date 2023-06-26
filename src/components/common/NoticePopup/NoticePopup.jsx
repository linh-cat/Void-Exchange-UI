import React, { useEffect, useState } from "react"
import cx from "classnames"

import LoadingLine from "../LoadingLine/LoadingLine"

import "./NoticePopup.css"

const NoticePopup = ({ body, duration, onClose, position = "center" }) => {
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
        "card shadow border absolute w-96 rounded p-2 flex flex-col gap-2 text-sm transition-opacity z-50",
        {
          "top-28 left-1/2 -translate-x-1/2": position === "center",
          "bottom-0 right-0": position === "bottom-right",
          "top-0 left-0": position === "top-left",
          "bottom-0 left-0": position === "bottom-left"
        }
      )}
    >
      {body}
      <LoadingLine />
    </div>
  )
}

export default NoticePopup
