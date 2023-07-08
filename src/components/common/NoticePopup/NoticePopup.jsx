import React, { useEffect, useState } from "react"
import cx from "classnames"

import LoadingLine from "../LoadingLine/LoadingLine"

const NoticePopup = ({ body, position = "center", type = "default", showLoadingLine = true }) => {
  const [percent, setPercent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={cx("card shadow absolute w-96 rounded p-2 flex flex-col gap-2 text-sm transition-opacity z-50", {
        "top-14 left-1/2 -translate-x-1/2": position === "center",
        "bottom-3 right-3": position === "bottom-right",
        "top-3 left-3": position === "top-left",
        "bottom-3 left-3": position === "bottom-left",
        "border-green": type === "success",
        "border-red": type === "error",
        "border-yellow": type === "pending",
        "border-default": type === "default",
        "fade-in": true,
        visible: isVisible
      })}
    >
      {showLoadingLine && (
        <div className="absolute right-2 top-3">
          <div
            className={cx({
              "text-pending": type === "pending",
              "text-success": type === "success",
              "text-error": type === "error",
              "botder-default": type === "default"
            })}
          >
            {percent <= 100 ? "Pending" : "Executing"} ({percent <= 100 ? percent : "100"}%)
          </div>
        </div>
      )}

      {body}
      {showLoadingLine && <LoadingLine loadingWidth={percent} setLoadingWidth={setPercent} type={type} />}
    </div>
  )
}

export default NoticePopup
