import React from "react"
import { useAccount } from "wagmi"
import cx from "classnames"

const RequireConnectionMask = ({ children }) => {
  const { isConnected } = useAccount()

  return (
    <div className="relative h-full w-full">
      <div
        className={cx({
          "absolute top-0 left-0 blur-bg w-full h-full": !isConnected,
          hidden: isConnected
        })}
      >
        <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border px-3 py-2 rounded">
          Please connect wallet
        </label>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default RequireConnectionMask
