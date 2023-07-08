import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Faucet, Constants } from "@void-0x/void-sdk"
import { isChainSupported } from "src/lib/chains"

const useMintFaucet = ({ amount, selectedToken }) => {
  const [isMinting, setIsMinting] = useState(false)
  const [faucets, setFaucets] = useState(null)
  const [shouldShowPopup, setShouldShowPopup] = useState(false)

  const publicClient = usePublicClient()
  const { data: walletClient, isLoading } = useWalletClient()
  const { chain } = useNetwork()

  useEffect(() => {
    if (chain && !isLoading && isChainSupported(chain)) {
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

  const handleMint = async () => {
    const faucet = faucets[selectedToken?.symbol]
    if (!faucet) {
      return
    }

    setIsMinting(true)
    const hash = await faucet.mint(amount)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsMinting(false)
    setShouldShowPopup(true)

    setTimeout(() => {
      setShouldShowPopup(false)
    }, 3000)
  }

  return { isMinting, handleMint, shouldShowPopup }
}

useMintFaucet.propTypes = {
  amount: PropTypes.number,
  selectedToken: {
    symbol: PropTypes.string
  }
}

export default useMintFaucet
