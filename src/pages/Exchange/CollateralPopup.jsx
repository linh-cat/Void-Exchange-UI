import React from "react"
import "./CollateralPopup.css"
import cx from "classnames"
import useOutsideDetect from "src/hooks/useOutsideDetect"
const CollateralPopup = ({ open, setOpen, collateralTab, setCollateralTab, header, body, footer }) => {
  const handleClickOutside = () => {
    setOpen(false)
  }

  const refOutside = useOutsideDetect(handleClickOutside)
  return (
    <>
      <div className={cx({ "collateral-container": true, "z-10 opacity-60": open, "-z-10": !open })}></div>
      <div
        className={cx({ "collateral-popup text-xs p-3 font-medium card": true, block: open, hidden: !open })}
        ref={refOutside}
      >
        {header}
        {body}
        {footer}
      </div>
    </>
  )
}

export default CollateralPopup
