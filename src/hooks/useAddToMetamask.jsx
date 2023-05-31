import { useCallback } from "react"

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
          .then((success) => {
            onSuccess(success)
          })
          .catch(() => onSuccess(false))
      } else {
        onSuccess(false)
      }
    },
    [isMetaMask]
  )
}

export default useAddToMetamask
