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
        "card shadow border absolute bottom-0 left-0 w-96 rounded p-3 flex flex-col gap-3 text-sm transition-opacity"
      )}
    >
      {body}
      <LoadingLine />
    </div>
  )
}

export default NoticePopup
