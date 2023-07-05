import React, { useState } from "react"
import cx from "classnames"

import LoadingLine from "../LoadingLine/LoadingLine"

import "./NoticePopup.css"

const NoticePopup = ({ body, position = "center" }) => {
  const [percent, setPercent] = useState(0)
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
      <div className="absolute right-2 top-3">
        <div className={cx({ "text-pending": percent <= 100, "green-up": percent >= 100 })}>
          {percent <= 100 ? "Pending" : "Executing"} ({percent <= 100 ? percent : "100"}%)
        </div>
      </div>

      {body}
      <LoadingLine loadingWidth={percent} setLoadingWidth={setPercent} />
    </div>
  )
}

export default NoticePopup
