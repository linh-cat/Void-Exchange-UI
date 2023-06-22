import React, { useEffect, useState } from "react"
import cx from "classnames"
import "./NoticePopup.css"
import LoadingLine from "../LoadingLine/LoadingLine"

const NoticePopup = ({ body, duration, onClose }) => {
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
        "card shadow border absolute top-0 left-1/2 -translate-x-1/2 w-96 rounded p-3 py-5 flex flex-col gap-3 text-sm transition-opacity z-50"
      )}
    >
      {body}
      <LoadingLine />
    </div>
  )
}

export default NoticePopup
