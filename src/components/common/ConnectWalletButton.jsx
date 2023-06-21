import React, { useState } from "react"

import { useAccount, useNetwork, useConnect, useBalance, useDisconnect, useSwitchNetwork } from "wagmi"

import cx from "classnames"
import Modal from "@components/Modal/Modal"
import { decialNumber } from "src/common/fomatter"
import { ArrowTopRight, CopyIcon, DownIcon, Metamask } from "@icons/index"
import Button from "@components/Button/Button"

import "./ConnectWalletButton.css"
import { Popover } from "@headlessui/react"
import { Arbitrum, Base, EthereumChain } from "@img/logo"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

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
  11155111: EthereumChain,
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
  const navigate = useNavigate()

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
          <div className="flex flex-col md:flex-row gap-3">
            <>
              <Popover className="relative">
                <Popover.Button className="flex justify-center items-center border h-11 px-2 rounded gap-4 ">
                  <div className="flex items-center gap-2">
                    <img src={iconForMapping[currentChain.id]} alt="icon" className="w-5 h-5" />
                    <span className="">{currentChain.name}</span>
                  </div>
                  <img src={DownIcon} alt="down-icon" />
                </Popover.Button>

                <Popover.Panel className="absolute right-0 z-10 w-52 rounded flex flex-col shadow border">
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

              <Popover className="relative">
                <Popover.Button className="flex justify-center items-center border h-11 px-2 rounded gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      {decialNumber(balance?.formatted, 4)} {balance?.symbol}
                    </div>
                    <Button
                      text={<div>{truncate(address, 5)}</div>}
                      className="border px-2 py-1 bg-input"
                      isDefault={false}
                    />
                    <div>
                      <div className="rounded-full overflow-hidden w-6 h-6 inline-flex p-0 m-0 bg-yellow justify-center">
                        <svg x="0" y="0" width="24" height="18">
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            transform="translate(0.9013319580392469 5.487147309226646) rotate(176.1 12 12)"
                            fill="#FA9A00"
                          ></rect>
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            transform="translate(6.232414534640344 -12.646756909390337) rotate(341.3 12 12)"
                            fill="#FB183E"
                          ></rect>
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            transform="translate(-15.923198044392672 1.9208714646717957) rotate(188.7 12 12)"
                            fill="#F2C202"
                          ></rect>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Popover.Button>
                <Popover.Panel className="absolute right-0 z-10 w-96 rounded text-base shadow border">
                  <div className="px-3 py-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label className="text-lg">Account</label>
                      <div className="text-slate-400">
                        {balance?.formatted} {balance?.symbol}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400">Connect with metamask</label>
                      <div>
                        <div onClick={() => disconnect()} className="link-color cursor-pointer">
                          Disconnect
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-3 border py-2 px-2 rounded shadow">
                      <div className="flex gap-3">
                        <div className="rounded-full overflow-hidden w-6 h-6 inline-flex p-0 m-0 bg-yellow justify-center">
                          <svg x="0" y="0" width="24" height="18">
                            <rect
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                              transform="translate(0.9013319580392469 5.487147309226646) rotate(176.1 12 12)"
                              fill="#FA9A00"
                            ></rect>
                            <rect
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                              transform="translate(6.232414534640344 -12.646756909390337) rotate(341.3 12 12)"
                              fill="#FB183E"
                            ></rect>
                            <rect
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                              transform="translate(-15.923198044392672 1.9208714646717957) rotate(188.7 12 12)"
                              fill="#F2C202"
                            ></rect>
                          </svg>
                        </div>
                        <div className="text-slate-400">{truncate(address, 7)}</div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <img src={CopyIcon} alt="copy" className="w-5 h-5 cursor-pointer" />
                        <img
                          src={ArrowTopRight}
                          alt="top right"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
                        />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </>
          </div>
        )
      })()}
    </div>
  )
}

export default ConnectWalletButton
