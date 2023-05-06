import React from "react"
import "./CollateralPopup.css"
import cx from "classnames"
import useOutsideDetect from "src/hooks/useOutsideDetect"

const CollateralPopup = ({ open, setOpen, collateralTab, setCollateralTab }) => {
  const handleClickOutside = () => {
    setOpen(false)
  }

  const refOutside = useOutsideDetect(handleClickOutside)
  return (
    <>
      <div className={cx({ "collateral-container": true, "z-10 opacity-60": open, "-z-10": !open })}></div>
      <div
        className={cx({ "collateral-popup text-xs p-3 font-medium ": true, block: open, hidden: !open })}
        ref={refOutside}
      >
        <div className="collateral-header">
          <label className="font-medium">
            Change Collateral - <span className="red-down">Short ETH</span>
          </label>
          <div className="colateral-tab font-medium mt-3">
            <button className={cx({ active: collateralTab === "add" })} onClick={() => setCollateralTab("add")}>
              Add
            </button>
            <button
              className={cx({ active: collateralTab === "remove", "bg-orange": collateralTab === "remove" })}
              onClick={() => setCollateralTab("remove")}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="collateral-content mt-3">
          {/* input */}
          <div className="collateral-input p-3 flex flex-col gap-y-3">
            <div className="top flex justify-between">
              <label className="text-zinc-500">Add</label>
              <div className="text-zinc-500">Max: 5.29</div>
            </div>
            <div className="middle flex justify-between">
              <input placeholder="0.01" />
              <div>USDT</div>
            </div>
            <div className="bottom flex justify-between">
              <button
                className={cx({ "px-3 py-1 bg-zinc-700": true, active: true, "bg-orange": collateralTab === "remove" })}
              >
                25%
              </button>
              <button className="px-3 py-1 bg-zinc-700">50%</button>
              <button className="px-3 py-1 bg-zinc-700">75%</button>
              <button className="px-3 py-1 bg-zinc-700">100%</button>
            </div>
          </div>
          {/* infor */}
          <div className="collateral-infor mt-3 flex flex-col gap-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-500">Position Size</label>
              <label>
                0.0261 <span className="text-zinc-500">($49.2)</span>
              </label>
            </div>
            <div className="flex justify-between">
              <label className="text-zinc-500">Collateral(USDT)</label>
              <label>
                4.96$ - <span className="text-zinc-500">$9.2</span>
              </label>
            </div>
            <div className="flex justify-between">
              <label className="text-zinc-500">Leverage</label>
              <label>
                10.0X - <span className="text-zinc-500">7.9X</span>
              </label>
            </div>
            <div className="flex justify-between">
              <label className="text-zinc-500">Index Price</label>
              <label>$1.1119.0</label>
            </div>
            <div className="flex justify-between">
              <label className="text-zinc-500">Liq.Price</label>
              <label>
                $2,079.0 - <span className="text-zinc-500">$ 2,123.2</span>
              </label>
            </div>
          </div>
        </div>
        <div className="collateral-footer mt-3">
          <button
            className={cx({
              "secondary-btn": collateralTab === "add",
              btn: true,
              "bg-orange": collateralTab === "remove"
            })}
          >
            {collateralTab === "add" ? "Add Collateral" : "Remove Collateral"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CollateralPopup
