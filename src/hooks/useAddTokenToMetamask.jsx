import { useCallback } from "react"
import { toast } from "react-hot-toast"

const useAddTokenToMetamask = () => {
  const isMetaMask = window.ethereum.isMetaMask
  const addToken = useCallback(
    /*
     * @param {Object} args
     * @param {string} args.address
     * @param {string} args.symbol
     * @param {number} args.decimals
     * @param {string} args.image
     **/
    (args) => {
      if (window && isMetaMask && window.ethereum.request && args.address) {
        window.ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: args
            }
          })
          .then(() => {
            toast.success("Token added successfuly!")
          })
          .catch(() => toast.error("Failed to add token!"))
      }
    },
    [isMetaMask]
  )
  return { addToken }
}

export default useAddTokenToMetamask
