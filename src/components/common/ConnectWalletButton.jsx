import "./ConnectWalletButton.css";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWalletButton = ({ imgSrc, children }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="connect-wallet-btn"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex"
                  >
                    {imgSrc && (
                      <img
                        className="btn-icon"
                        src={imgSrc}
                        alt="Connect Wallet"
                      />
                    )}
                    <span className="btn-label">{children}</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-7">
                  <button
                    onClick={openChainModal}
                    className="flex items-center"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
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
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center"
                  >
                    <div className="text-xs">{account.displayName}</div>
                    <div className="text-xs">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
