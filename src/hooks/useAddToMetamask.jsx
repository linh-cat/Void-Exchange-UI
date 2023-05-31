import { useCallback } from "react"
import { toast } from "react-hot-toast"

const useAddToMetamask = () => {
  const isMetaMask = window.ethereum.isMetaMask

  return useCallback(
    (args) => {
      const { onSuccess, address, ...rest } = args
      console.log({ args })

      if (window && isMetaMask && window.ethereum.request && address) {
        window.ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address,
                ...rest
              }
            }
          })
          .then(() => {
            toast.success("Token added successfuly!")
          })
          .catch(() => toast.error("Token add failed!"))
      } else {
        onSuccess(false)
      }
    },
    [isMetaMask]
  )
}

export default useAddToMetamask
