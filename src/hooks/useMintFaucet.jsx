import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { toast } from "react-hot-toast"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Faucet, Constants } from "@void-0x/void-sdk"

const useMintFaucet = ({ amount, selectedToken }) => {
  const publicClient = usePublicClient()
  const { data: walletClient, isLoading } = useWalletClient()
  const [isMinting, setIsMinting] = useState(false)
  const [faucets, setFaucets] = useState(null)

  const { chain } = useNetwork()

  const handleMint = async () => {
    setIsMinting(true)

    const faucet = faucets[selectedToken?.symbol]
    if (!faucet) {
      return
    }
    const hash = await faucet.mint(amount)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsMinting(false)
    toast.success("Successfully minted!")
  }

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
  }, [isLoading, chain, publicClient, walletClient])

  return { isMinting, handleMint }
}

useMintFaucet.propTypes = {
  amount: PropTypes.string,
  selectedToken: {
    symbol: PropTypes.string,
  }
}

export default useMintFaucet
