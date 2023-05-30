import React from "react"
import useUserWindow from "../../hooks/useUserWindow"
import "./ConnectWalletButton.css"
import Button from "@components/Button/Button"
import { useAccount, useNetwork, useConnect, useBalance } from "wagmi"
const truncate = (string, limit) => {
  if (string.length <= limit) {
    return string
  }
  return string.slice(0, limit) + "..." + string.slice(string.length - 4, string.length)
}
const ConnectWalletButton = ({ imgSrc }) => {
  const { width } = useUserWindow()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })

  const openChainModal = () => {}

  return (
    <div>
      {(() => {
        if (!isConnected) {
          return (
            <div>
              {connectors.map((connector) => (
                <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                </button>
              ))}

              {error && <div>{error.message}</div>}
            </div>
          )
        }

        if (chain.unsupported) {
          return <Button onClick={openChainModal} isDefault="false" className="" text="Wrong network" />
        }

        return (
          <div className="flex gap-3">
            <>
              <Button
                text={
                  <div>
                    {truncate(address, 5)} {chain?.name} {balance?.formatted} {balance?.symbol}
                  </div>
                }
                className="inline-block border px-2 py-3"
                isDefault={false}
              />
            </>
          </div>
        )
      })()}
    </div>
  )
}

export default ConnectWalletButton
