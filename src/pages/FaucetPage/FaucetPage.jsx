import React, { useState, useEffect } from "react"
import ETH from "@img/WETH.png"
import CardWrapper from "@components/CardWrapper/CardWrapper"
import Mobo from "@img/morpho.png"
import BTC from "@img/btc.png"
import WETH from "@img/WETH.png"
import USDC from "@img/usdc.png"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import Modal from "@components/Modal/Modal"
import { InputCustom } from "@components/common"
import Metamask from "@img/metamask.png"
import { usePublicClient, useWalletClient, useNetwork, useContractReads } from "wagmi"
import { formatUnits } from "viem"
import { Faucet, Constants } from "@void-0x/void-sdk"
import toast from "react-hot-toast"

const tokens = [
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    img: BTC,
    decimals: 8
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    img: WETH,
    decimals: 18
  },
  {
    symbol: "USDC",
    name: "USD Stable coin",
    img: USDC,
    decimals: 6
  }
]

const FaucetPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedToken, setSelectedToken] = useState(null)
  const [balances, setBalances] = useState({
    WBTC: 0,
    WETH: 0,
    USDC: 0
  })

  const publicClient = usePublicClient()
  const [faucets, setFaucets] = useState(null)
  const { data: walletClient, isLoading } = useWalletClient()
  const { chain, isConnected } = useNetwork()
  const [isMinting, setIsMinting] = useState(false)

  useEffect(() => {
    if (chain && !isLoading) {
      const wbtcFaucet = new Faucet(publicClient, walletClient, Constants.Addresses[chain.id].Faucet.WBTC)
      const wethFaucet = new Faucet(publicClient, walletClient, Constants.Addresses[chain.id].Faucet.WETH)
      const usdcFaucet = new Faucet(publicClient, walletClient, Constants.Addresses[chain.id].Faucet.USDC)

      setFaucets({
        WBTC: wbtcFaucet,
        WETH: wethFaucet,
        USDC: usdcFaucet
      })
    }
  }, [isLoading, chain])

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

  const onMint = async () => {
    setIsMinting(true)
    const faucet = faucets[selectedToken.symbol]

    if (!faucet) {
      return
    }
    const hash = await faucet.mint(amount)
    await publicClient.waitForTransactionReceipt({ hash })
    setIsMinting(false)
    setOpenModal(false)
    toast.success("Successfully minted!")
  }

  const onTokenSelect = (token) => {
    setSelectedToken(token)
    showModal()
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
        return formatUnits(balances[token.symbol], token.decimals)
      },
      headerClassName: "text-sm"
    },
    {
      field: "action",
      headerName: "",
      cellRenderer: (token) => {
        return (
          <div className="flex justify-center">
            <Button text="Faucet" className="py-2 inline-block w-1/2" onClick={() => onTokenSelect(token)} />
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
              <h3>Faucet {selectedToken?.symbol}</h3>
              <img src={selectedToken?.img} alt="dai" className="h-5 w-5" />
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
          <TableCustom columnDef={columnDef} data={tokens} cellStyle="py-3 px-3" />
        </CardWrapper>
      </div>
    </div>
  )
}

export default FaucetPage
