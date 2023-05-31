import React, { useState } from "react"
import Button from "@components/Button/Button"
import { useAccount, useNetwork, useConnect, useBalance, useDisconnect } from "wagmi"
import Modal from "@components/Modal/Modal"
import { decialNumber } from "src/common/fomatter"
import Metamask from "@img/metamask.png"

import "./ConnectWalletButton.css"

const truncate = (string, limit) => {
  if (string.length <= limit) {
    return string
  }
  return string.slice(0, limit) + "..." + string.slice(string.length - 4, string.length)
}
const ConnectWalletButton = ({ imgSrc }) => {
  const [changeModal, setChainModal] = useState(false)
  const [connectModal, setConnectModal] = useState(false)
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const { data: balance } = useBalance({ address })

  const headerChainModal = <div>Select Chains</div>
  const headerConnectModal = <div>Connect Wallet</div>

  const bodyChainModal = (
    <div>
      {chain && chains.length && (
        <div className="list-chains flex flex-col gap-2">
          {chains.map((c) => (
            <div className="cursor-pointer border p-2 flex justify-center items-center gap-3">
              {c.id === chain.id && <div className="active-chain"></div>}
              <div>{c.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const footerChainModal = (
    <div>
      <Button
        text="Disconnect"
        onClick={() => {
          disconnect()
          setChainModal(false)
        }}
      />
    </div>
  )

  const bodyConnectModal = (
    <div className="flex flex-col gap-3">
      {connectors.map((connector) => {
        const textBtn = !connector.ready ? " (unsupported)" : connector.name
        return (
          <Button
            text={textBtn}
            onClick={() => {
              connect({ connector })
              setConnectModal(false)
            }}
            isDefault={false}
            className="border p-3"
            icon={connector.id === "metaMask" && <img src={Metamask} alt="metamask" className="h-4 w-4" />}
          />
        )
      })}
    </div>
  )

  console.log({ chain })

  return (
    <div>
      <Modal open={connectModal} setOpen={setConnectModal} header={headerConnectModal} body={bodyConnectModal} />
      <Modal
        header={headerChainModal}
        open={changeModal}
        setOpen={setChainModal}
        body={bodyChainModal}
        footer={footerChainModal}
      />
      {(() => {
        if (!isConnected) {
          return (
            <div>
              <Button onClick={() => setConnectModal(true)} text="Connect Wallet" />
            </div>
          )
        }

        if (chain.unsupported) {
          return <Button isDefault="false" className="" text="Wrong network" onClick={() => setChainModal(true)} />
        }

        return (
          <div className="flex gap-3">
            <>
              <Button
                text={
                  <div className="flex items-center gap-2">
                    <div className="active-chain"></div>
                    <label>{chain.name}</label>
                  </div>
                }
                onClick={() => setChainModal(true)}
                isDefault={false}
                className="border px-3 shadow"
              />
              <Button
                text={
                  <div className="flex items-center gap-3">
                    <div className="">
                      {decialNumber(balance?.formatted, 4)} {balance?.symbol}
                    </div>
                    <Button
                      text={<div>{truncate(address, 5)}</div>}
                      className="border px-2 py-1 bg-input"
                      isDefault={false}
                    />
                  </div>
                }
                className="inline-block border px-2 py-1 shadow"
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
