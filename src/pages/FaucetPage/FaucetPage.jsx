import React, { useState, useCallback } from "react"

import { Faucet, Constants } from "@void-0x/void-sdk"
import { useWalletClient, useNetwork, useContractReads } from "wagmi"
import { formatUnits } from "viem"

import useAddTokenToMetamask from "src/hooks/useAddTokenToMetamask"

import Card from "@components/Card/Card"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import Modal from "@components/Modal/Modal"
import { InputCustom } from "@components/common"
import useMintFaucet from "src/hooks/useMintFaucet"
import RequireConnectionMask from "@components/RequireConnectionMask/RequireConnectionMask"
import Footer from "@components/Footer/Footer"

import { BTC, ETH, USDC } from "@img/token"
import { Metamask, Void } from "@img/logo"
import { MorphoBG } from "@img/bg"
import { formatDecimals } from "src/lib/formatter"
import NoticePopup from "@components/common/NoticePopup/NoticePopup"
import { ExclamationWarningIcon, FlashSuccessIcon } from "@icons/index"
import ErrorModal from "@components/ErrorModal/ErrorModal"
import SEO from "@components/common/SEO"
import { getPageTitle } from "src/lib/utils"

const tokens = [
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    img: BTC,
    decimals: 8,
    max: 10
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    img: ETH,
    decimals: 18,
    max: 20
  },
  {
    symbol: "USDC",
    name: "USD Stable coin",
    img: USDC,
    decimals: 6,
    max: 50000
  }
]

const FaucetPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [amount, setAmount] = useState()
  const [selectedToken, setSelectedToken] = useState(null)
  const [balances, setBalances] = useState({
    WBTC: 0,
    WETH: 0,
    USDC: 0
  })

  const { data: walletClient } = useWalletClient()
  const { chain } = useNetwork()

  useContractReads({
    contracts: [
      {
        address: Constants.Addresses[chain?.id]?.Faucet?.WBTC,
        abi: Faucet.getABI(),
        functionName: "balanceOf",
        args: [walletClient?.account?.address]
      },
      {
        address: Constants.Addresses[chain?.id]?.Faucet?.WETH,
        abi: Faucet.getABI(),
        functionName: "balanceOf",
        args: [walletClient?.account?.address]
      },
      {
        address: Constants.Addresses[chain?.id]?.Faucet?.USDC,
        abi: Faucet.getABI(),
        functionName: "balanceOf",
        args: [walletClient?.account?.address]
      }
    ],
    onSuccess: (data) => {
      if (!data) {
        return
      }

      setBalances({
        ...balances,
        WBTC: data[0]?.result,
        WETH: data[1]?.result,
        USDC: data[2]?.result
      })
    },
    watch: true, // refresh balance on new blocks
    watchInterval: 2000
  })

  const showModal = () => {
    setOpenModal(true)
  }
  const onTokenSelect = (token) => {
    setSelectedToken(token)
    showModal()
  }

  const { isMinting, handleMint, shouldShowPopup, showErrorModal } = useMintFaucet({ amount, selectedToken })
  const onMint = async () => {
    await handleMint()
    setOpenModal(false)
    setAmount()
  }

  const { addToken, showPopup } = useAddTokenToMetamask()

  const getFaucetAddress = useCallback(
    (symbol) => {
      if (!chain || !chain.id) {
        console.error("Please connect metamask")
        return
      }

      return Constants.Addresses[chain.id]?.Faucet?.[symbol]
    },
    [chain]
  )

  const columnDef = [
    {
      field: "asset",
      headerName: "Asset",
      headerClassName: "text-sm text-left px-3 py-3",
      className: "text-left text-xs lg:text-sm",
      cellRenderer: (cell) => {
        return (
          <div className="flex items-center gap-2">
            <img src={cell?.img} alt="token" className="h-10 w-10" />
            <div className="flex flex-col gap-1">
              <label>{cell?.symbol}</label>
              <span className="text-xs text-slate-500">{cell?.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      headerName: "Wallet Balance",
      cellRenderer: (token) => {
        return balances && balances[token.symbol] && token
          ? formatDecimals(formatUnits(balances[token.symbol], token.decimals), 4)
          : 0
      },
      className: "text-xs lg:text-sm",
      headerClassName: "text-sm py-3"
    },
    {
      field: "action",
      headerName: "",
      className: "text-xs lg:text-sm",
      cellRenderer: (token) => {
        return (
          <div className="flex justify-center gap-3">
            <Button
              text="Faucet"
              className="py-1 lg:py-2 inline-block w-1/3 text-xs lg:text-sm truncate"
              onClick={() => onTokenSelect(token)}
            />
            <Button
              text="Add Token"
              className="py-1 lg:py-2 inline-block w-1/3 border text-xs lg:text-sm truncate cursor-pointer"
              isDefault={false}
              onClick={() =>
                addToken({
                  address: getFaucetAddress(token.symbol),
                  symbol: token.symbol,
                  decimals: token.decimals
                })
              }
              icon={<img src={Metamask} alt="metamask" className="h-4 w-4 cursor-pointer" />}
            />
          </div>
        )
      }
    }
  ]

  return (
    <SEO title={getPageTitle("Faucet")}>
      {showErrorModal?.show && (
        <ErrorModal
          title={showErrorModal.message.name}
          shortMessage={showErrorModal.message.shortMessage}
          contentMessage={showErrorModal.message.message}
        />
      )}
      {/* <ErrorModal
        title="Transaction Error"
        shortMessage="User denied transaction"
        contentMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      /> */}
      {showPopup?.enable && showPopup?.type === "success" && (
        <NoticePopup
          body={
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <h2 className="text-base text-success">Add To Metamask</h2>
                <img src={FlashSuccessIcon} alt="icon" className="w-5 h-5" />
              </div>
              <p>You have add token in metamask successfully</p>
            </div>
          }
          type="success"
          showLoadingLine={false}
        />
      )}
      {showPopup?.enable && showPopup?.type === "pending" && (
        <NoticePopup
          body={
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <h2 className="text-base text-pending">Add To Metamask</h2>
                <img src={ExclamationWarningIcon} alt="icon" className="w-5 h-5" />
              </div>
              <p>Failed to add token!</p>
            </div>
          }
          type="pending"
          showLoadingLine={false}
        />
      )}

      {shouldShowPopup && (
        <NoticePopup
          body={
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <h2 className="text-base text-success">Faucet</h2>
                <img src={FlashSuccessIcon} alt="icon" className="w-5 h-5" />
              </div>
              <p>You have faucet the asset successfully</p>
            </div>
          }
          type="success"
          showLoadingLine={false}
        />
      )}
      <div className="flex flex-col gap-20">
        <div className="px-10 2xl:px-0">
          <Modal
            open={openModal}
            setOpen={setOpenModal}
            header={
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <h3>Faucet {selectedToken?.symbol}</h3>
                  <img src={selectedToken?.img} alt="dai" className="h-5 w-5" />
                </div>
                <div>
                  <label className="text-sm text-slate-500">Max: {selectedToken?.max}</label>
                </div>
              </div>
            }
            footer={
              <Button text="Faucet" onClick={onMint} isLoading={isMinting} disabled={amount > selectedToken?.max} />
            }
            body={
              <div>
                <InputCustom
                  placeHolder="Amount"
                  classNameInput="py-3 px-2"
                  rightAction={
                    <div className="cursor-pointer mr-2" onClick={() => setAmount(selectedToken?.max)}>
                      Max
                    </div>
                  }
                  type="number"
                  value={amount}
                  onChange={(val) => setAmount(val)}
                  disabled={isMinting}
                />
                {amount > selectedToken?.max && (
                  <div className="text-sm text-yellow-500 text-left"> Mint amount must be less than max value </div>
                )}
              </div>
            }
            disabled={isMinting}
          />
          <div
            className="bg-cover blur-3xl bg-center w-full h-6 absolute top-40 right-28"
            style={{ backgroundImage: `url(${MorphoBG})` }}
          ></div>
          <div className="faucet-banner mx-auto max-w-7xl py-10 ">
            <Card className="w-full p-5" hasShadow={true}>
              <div className="flex flex-col gap-3 ">
                <div className="title flex items-center gap-3">
                  <img src={Void} alt="eth" className="h-10 w-10" />
                  <h1 className="text-2xl">Void Exchange Faucet</h1>
                </div>
                <div className="text-slate-500 text-sm">
                  With testnet Faucet you can get free assets to test the Void Protocol. Make sure to switch your wallet
                  provider to the appropriate testnet network, select desired asset, and click ‘Faucet’ to get tokens
                  transferred to your wallet. The assets on a testnet are not “real,” meaning they have no monetary
                  value.
                </div>
              </div>
            </Card>
          </div>
          <div className="faucet-list mx-auto max-w-7xl">
            <h4 className="mb-3">Test Assets</h4>
            <Card>
              <RequireConnectionMask>
                <TableCustom columnDef={columnDef} data={tokens} cellStyle="py-3 px-3" />
              </RequireConnectionMask>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  )
}

export default FaucetPage
