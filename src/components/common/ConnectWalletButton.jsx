import React, { useState } from "react"

import { useAccount, useNetwork, useConnect, useBalance, useDisconnect, useSwitchNetwork } from "wagmi"

import cx from "classnames"
import Modal from "@components/Modal/Modal"
import { decialNumber } from "src/common/fomatter"
import { DownIcon, Metamask } from "@icons/index"
import Button from "@components/Button/Button"

import "./ConnectWalletButton.css"
import { Popover } from "@headlessui/react"
import { Arbitrum, Base, Ethereum, EthereumChain } from "@img/logo"
import { CheckIcon } from "@heroicons/react/24/solid"

const truncate = (string, limit) => {
  if (string.length <= limit) {
    return string
  }
  return string.slice(0, limit) + "..." + string.slice(string.length - 4, string.length)
}
const listChainNotSupport = {
  1: "Ethereum"
}
const iconForMapping = {
  1: EthereumChain,
  84531: Base,
  11155111: Base,
  5: Base,
  42161: Arbitrum
}
const ConnectWalletButton = ({ imgSrc }) => {
  const [connectModal, setConnectModal] = useState(false)
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { chain: currentChain, chains } = useNetwork()
  const { data: balance } = useBalance({ address })

  const headerConnectModal = <div>Connect Wallet</div>

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
            key={connector.id}
          />
        )
      })}
    </div>
  )

  const listChains = chains.map((l) => ({
    ...l,
    icon: iconForMapping[l.id]
  }))

  return (
    <div>
      <Modal open={connectModal} setOpen={setConnectModal} header={headerConnectModal} body={bodyConnectModal} />
      {(() => {
        if (!isConnected) {
          return (
            <div>
              <Button
                onClick={() => setConnectModal(true)}
                text="Connect Wallet"
                icon={<img src={imgSrc} className="h5 w-5" alt="icon" />}
              />
            </div>
          )
        }

        if (currentChain.unsupported) {
          return (
            <div className="flex items-center gap-5">
              <Popover className="relative">
                <Popover.Button className="flex items-center border h-11 px-5 rounded gap-3">
                  <span className="">{listChainNotSupport[currentChain.id] || "Not support"} </span>
                  <img src={DownIcon} alt="down-icon" />
                </Popover.Button>

                <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-10 w-40 bg-dropdown rounded flex flex-col">
                  {listChains?.map((c) => (
                    <span
                      className={cx({
                        "cursor-pointer px-3 h-12 flex items-center hover:bg-slate-800": true,
                        "active-chain": c.id === currentChain.id
                      })}
                      key={c.id}
                      onClick={() => switchNetwork(c.id)}
                    >
                      <div className="flex items-center gap-2">
                        <img src={c.icon} alt="icon" className="w-5 h-5" />
                        <label l className="cursor-pointer">
                          {c.name}
                        </label>
                      </div>
                      {c.id === currentChain.id && <CheckIcon className="w-5 h-5" />}
                    </span>
                  ))}
                </Popover.Panel>
              </Popover>
              <Button text="Wrong Network" isDefault={false} className="border py-3 px-3" />
              <Button
                text="Disconnect"
                onClick={() => {
                  disconnect()
                }}
              />
            </div>
          )
        }

        return (
          <div className="flex gap-3">
            <>
              <Popover className="relative">
                <Popover.Button className="flex items-center border h-11 px-5 rounded gap-3">
                  <span className="">{currentChain.name}</span>
                  <img src={DownIcon} alt="down-icon" />
                </Popover.Button>

                <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-10 w-52 bg-dropdown rounded flex flex-col">
                  {listChains?.map((c) => (
                    <span
                      className={cx({
                        "cursor-pointer px-3 bg-hover h-12 flex items-center justify-between hover:bg-slate-800 gap-2": true
                      })}
                      key={c.id}
                      onClick={() => switchNetwork(c.id)}
                    >
                      <div className="flex items-center gap-2">
                        <img src={c.icon} alt="icon" className="w-5 h-5" />
                        <label l className="cursor-pointer">
                          {c.name}
                        </label>
                      </div>
                      {c.id === currentChain.id && <CheckIcon className="w-5 h-5" />}
                    </span>
                  ))}
                </Popover.Panel>
              </Popover>

              <Button
                text={
                  <div className="flex items-center gap-3">
                    <div>
                      {decialNumber(balance?.formatted, 4)} {balance?.symbol}
                    </div>
                    <Button
                      text={<div>{truncate(address, 5)}</div>}
                      className="border px-2 py-1 bg-input"
                      isDefault={false}
                    />
                  </div>
                }
                className="inline-block border px-2 py-1"
                isDefault={false}
              />
              <Button
                text="Disconnect"
                onClick={() => {
                  disconnect()
                }}
              />
            </>
          </div>
        )
      })()}
    </div>
  )
}

export default ConnectWalletButton
