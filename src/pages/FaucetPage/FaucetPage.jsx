import React, { useState, useCallback } from "react"
import Card from "@components/Card/Card"
import Mobo from "@img/morpho.png"
import TableCustom from "@components/Table/TableCustom"
import Button from "@components/Button/Button"
import Modal from "@components/Modal/Modal"
import { InputCustom } from "@components/common"
import { useWalletClient, useNetwork, useContractReads } from "wagmi"
import { formatUnits } from "viem"
import { Faucet, Constants } from "@void-0x/void-sdk"
import useMintFaucet from "src/hooks/useMintFaucet"
import { BTC, ETH, USDC } from "@img/token"
import { Metamask } from "@icons/index"
import useAddTokenToMetamask from "src/hooks/useAddTokenToMetamask"
import { toast } from "react-hot-toast"
import RequireConnectionMask from "@components/RequireConnectionMask/RequireConnectionMask"

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
  const [amount, setAmount] = useState(1)
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

  const { isMinting, handleMint } = useMintFaucet({ amount, selectedToken })
  const onMint = async () => {
    await handleMint()
    setOpenModal(false)
  }

  const { addToken } = useAddTokenToMetamask()

  const getFaucetAddress = useCallback(
    (symbol) => {
      if (!chain || !chain.id) {
        toast.error("Please connect to Metamask!")
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
      headerClassName: "text-sm text-left",
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
        return formatUnits(balances[token.symbol], token.decimals)
      },
      className: "text-xs lg:text-sm",
      headerClassName: "text-sm"
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
              className="py-1 lg:py-2 inline-block w-1/3 border text-xs lg:text-sm truncate"
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
            <div>
              <label className="text-sm text-slate-500">Max: {selectedToken?.max}</label>
            </div>
          </div>
        }
        footer={<Button text="Faucet" onClick={onMint} isLoading={isMinting} disabled={amount > selectedToken?.max} />}
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
              value={amount}
              onChange={(val) => setAmount(val)}
            />
            {amount > selectedToken?.max && (
              <div className="text-sm text-yellow-500 text-left"> Mint amount must be less than max value </div>
            )}
          </div>
        }
      />
      <div
        className="bg-cover blur-3xl bg-center w-full h-6 absolute top-40 right-28"
        style={{ backgroundImage: `url(${Mobo})` }}
      ></div>
      <div className="faucet-banner mx-auto max-w-7xl py-10 ">
        <Card className="w-full p-5" hasShadow={true}>
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
  )
}

export default FaucetPage
