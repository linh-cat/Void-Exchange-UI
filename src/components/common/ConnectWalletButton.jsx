import React from "react"
import useUserWindow from "../../hooks/useUserWindow"
import "./ConnectWalletButton.css"
import Button from "@components/Button/Button"
import { useAccount, useNetwork, useConnect, useDisconnect } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"

const ConnectWalletButton = ({ imgSrc }) => {
  const { width } = useUserWindow()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const openConnectModal = () => {
    console.log("chain", chain)
    console.log("test test")
    connect()
  }
  const openAccountModal = () => {}
  const openChainModal = () => {}

  return (
    // Note: If your app doesn't use authentication, you
    // can remove all 'authenticationStatus' checks
    <div
    // {...{
    //   "aria-hidden": true,
    //   style: {
    //     opacity: 0,
    //     pointerEvents: "none",
    //     userSelect: "none"
    //   }
    // }}
    >
      <Button onClick={() => disconnect()} isDefault="false" className="" text="Disconnect" />
      {/* <Button */}
      {/*   onClick={openConnectModal} */}
      {/*   text={width > 768 ? "Connect Wallet" : "Wallet"} */}
      {/*   icon={imgSrc && width > 768 && <img className="btn-icon" src={imgSrc} alt="Connect Wallet" />} */}
      {/*   isDefault={false} */}
      {/*   className="border px-3 py-1 flex" */}
      {/* /> */}
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
              <button onClick={openChainModal} className="flex items-center" type="button">
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground
                    }}
                    className="w-3 overflow-hidden mr-4 rounded"
                  >
                    {chain.iconUrl && (
                      <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                    )}
                  </div>
                )}

                {width > 432 && <div>{chain.name}</div>}
              </button>

              <button onClick={openAccountModal} type="button" className="flex items-center">
                {/* {width > 432 && <div className="text-xs">{account.displayName}</div>} */}
                {/* <div className="text-xs">{account.displayBalance ? ` (${account.displayBalance})` : ""}</div> */}
              </button>
            </>
          </div>
        )
      })()}
    </div>
  )
}

export default ConnectWalletButton
