import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import useUserWindow from "../../hooks/useUserWindow"
import "./ConnectWalletButton.css"
import Button from "@components/Button/Button"

const ConnectWalletButton = ({ imgSrc }) => {
  const { width } = useUserWindow()
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none"
              }
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    text={width > 768 ? "Connect Wallet" : "Wallet"}
                    icon={imgSrc && width > 768 && <img className="btn-icon" src={imgSrc} alt="Connect Wallet" />}
                    isDefault={false}
                    className="border px-3 py-1 flex"
                  />
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
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}

                      {width > 432 && <div>{chain.name}</div>}
                    </button>

                    <button onClick={openAccountModal} type="button" className="flex items-center">
                      {width > 432 && <div className="text-xs">{account.displayName}</div>}
                      <div className="text-xs">{account.displayBalance ? ` (${account.displayBalance})` : ""}</div>
                    </button>
                  </>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletButton
