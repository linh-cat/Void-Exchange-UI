import { useMemo, useState } from "react"
import { usePublicClient, useWalletClient, useNetwork } from "wagmi"
import { Vault } from "@void-0x/void-sdk"
import { isChainSupported } from "src/lib/chains"

const useVault = (tokenAddress, vaultAddress) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldShowPopup, setShouldShowPopup] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState({ show: false, message: null })

  const publicClient = usePublicClient()
  const { data: walletClient, isLoading: isWalletLoading } = useWalletClient()
  const { chain } = useNetwork()

  const selectedVault = useMemo(() => {
    if (chain && !isWalletLoading && isChainSupported(chain)) {
      return new Vault(publicClient, walletClient, vaultAddress, tokenAddress)
    }
  }, [publicClient, walletClient, isWalletLoading, chain, tokenAddress, vaultAddress])

  const deposit = async (amount, from, receiver) => {
    if (!selectedVault) {
      return
    }

    try {
      setIsLoading(true)

      const hash = await selectedVault.deposit(amount, receiver, {
        simulate: true // static call before making real transaction
      })
      await publicClient.waitForTransactionReceipt({ hash })

      setIsLoading(false)
      setShouldShowPopup(true)
      setTimeout(() => {
        setShouldShowPopup(false)
      }, 5000)
    } catch (error) {
      setShowErrorModal({ show: true, message: error })
      setTimeout(() => {
        setShowErrorModal({ show: false, message: null })
        setIsLoading(false)
      }, 5000)
    }
  }

  return { isLoading, deposit, shouldShowPopup, showErrorModal }
}

export default useVault
