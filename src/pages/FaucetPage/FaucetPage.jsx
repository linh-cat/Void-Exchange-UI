import React, { useState, useEffect } from "react"
import ETH from "@img/WETH.png"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import Mobo from "@img/morpho.png"
import DAI from "@img/DAI.svg"
import USDT from "@img/usdt.svg"
import USDC from "@img/usdc.svg"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import Modal from "@components/Modal/Modal"
import { InputCustom } from "@components/common"
import Metamask from "@img/metamask.png"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Faucet, Constants } from "@void-0x/void-sdk"
import toast from "react-hot-toast"

const data = [
  {
    asset: "DAI",
    token: DAI,
    ballance: "10.00k"
  },
  {
    asset: "USDT",
    token: USDT,
    ballance: "0"
  },
  {
    asset: "USDC",
    token: USDC,
    ballance: "0"
  }
]

const FaucetPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [faucet, setFaucet] = useState(null)

  const publicClient = usePublicClient()
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const { chain, isConnected } = useNetwork()
  const [isMinting, setIsMinting] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const faucet = new Faucet(publicClient, walletClient, Constants.Addresses[chain.id].Faucet.WBTC)
      setFaucet(faucet)
    }
  }, [isLoading])

  const showModal = () => {
    setOpenModal(true)
  }

  const onMint = async () => {
    setIsMinting(true)
    const hash = await faucet.mint(amount)
    await publicClient.waitForTransactionReceipt({ hash })
    setIsMinting(false)
    setOpenModal(false)
    toast.success("Successfully minted!")
  }

  const columnDef = [
    {
      field: "asset",
      headerName: "Asset",
      headerClassName: "text-sm text-left",
      classname: "text-left",
      cellRenderer: (cell) => {
        return (
          <div className="flex items-center gap-2">
            <img src={cell?.token} alt="token" className="h-10 w-10" />
            <div className="flex flex-col gap-1">
              <label>{cell?.asset}</label>
              <span className="text-xs text-slate-500">{cell?.asset}</span>
            </div>
          </div>
        )
      }
    },
    {
      field: "ballance",
      headerName: "Wallet Balance",
      headerClassName: "text-sm"
    },
    {
      field: "action",
      headerName: "",
      cellRenderer: () => {
        return (
          <div className="flex justify-center">
            <Button text="Faucet" className="py-2 inline-block w-1/2" onClick={showModal} />
          </div>
        )
      }
    }
  ]

  return (
    <div className="p-5 xl:p-0">
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        header={
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h3>Faucet DAI</h3>
              <img src={DAI} alt="dai" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">Add Token</label>
              <img src={Metamask} alt="metamask" className="h-5 w-5 cursor-pointer" />
            </div>
          </div>
        }
        footer={<Button text="Faucet" onClick={onMint} isLoading={isMinting} />}
        body={
          <InputCustom
            placeHolder="Amount"
            classNameInput="py-3 px-2"
            rightAction={<div className="cursor-pointer mr-2">Max</div>}
            onChange={(val) => setAmount(val)}
          />
        }
      />
      <div
        className="bg-cover blur-3xl bg-center w-full h-6 absolute top-40 right-28"
        style={{ backgroundImage: `url(${Mobo})` }}
      ></div>
      <div className="faucet-banner mx-auto max-w-7xl py-10 ">
        <CardWrapper className="w-full p-5" hasShadow={true}>
          <div className="flex flex-col gap-3 ">
            <div className="title flex items-center gap-3">
              <img src={ETH} alt="eth" className="h-10 w-10" />
              <h1 className="text-2xl">Ethereum Market</h1>
            </div>
            <div className="text-zinc-500 text-sm">
              With testnet Faucet you can get free assets to test the ZK Protocol. Make sure to switch your wallet
              provider to the appropriate testnet network, select desired asset, and click ‘Faucet’ to get tokens
              transferred to your wallet. The assets on a testnet are not “real,” meaning they have no monetary value.
            </div>
          </div>
        </CardWrapper>
      </div>
      <div className="faucet-list mx-auto max-w-7xl">
        <h4 className="mb-3">Test Assets</h4>
        <CardWrapper>
          <TableCustom columnDef={columnDef} data={data} cellStyle="py-3 px-3" />
        </CardWrapper>
      </div>
    </div>
  )
}

export default FaucetPage
