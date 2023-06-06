import React, { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import cx from "classnames"
import { useNetwork } from "wagmi"
import { isChainSupported } from "src/lib/chains"

const RequireConnectionMask = ({ children }) => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const [isSupported, setIsSupported] = useState(isChainSupported(chain))

  useEffect(() => {
    const isSupported = isChainSupported(chain)
    setIsSupported(isSupported)
  }, [chain])

  const show = !isConnected || !isSupported

  return (
    <div className="relative h-full w-full">
      <div
        className={cx({
          "absolute top-0 left-0 blur-bg w-full h-full": show,
          hidden: !show
        })}
      >
        <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border px-3 py-2 rounded">
          {/* TODO: refactor this*/}
          Please connect wallet and switch to supported networks
        </label>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default RequireConnectionMask
