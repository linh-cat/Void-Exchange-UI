import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { usePublicClient } from "wagmi"

const useMintFaucet = ({ amount, faucets, selectedToken }) => {
  const publicClient = usePublicClient()
  const [isMinting, setIsMinting] = useState(false)

  const handleMint = async () => {
    setIsMinting(true)

    const faucet = faucets[selectedToken.symbol]
    if (!faucet) {
      return
    }
    const hash = await faucet.mint(amount)
    await publicClient.waitForTransactionReceipt({ hash })

    setIsMinting(false)
    toast.success("Successfully minted!")
  }

  return { mintLoading: isMinting, handleMint }
}

export default useMintFaucet
