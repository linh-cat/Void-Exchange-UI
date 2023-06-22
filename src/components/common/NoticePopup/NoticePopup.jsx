import React from "react"
import cx from "classnames"
import "./NoticePopup.css"

const NoticePopup = ({ body, open = false, setOpen }) => {
  return (
    <div
      className={cx(
        "card shadow border absolute bottom-0 left-0 w-96 rounded p-3 flex flex-col gap-3 text-sm transition-opacity",
        {
          close: !open,
          open: open
        }
      )}
    >
      {body}
    </div>
  )
}

export default NoticePopup
