import { useCallback, useState } from "react"

const useAddTokenToMetamask = () => {
  const [showPopup, setShowPopup] = useState({ enable: false, type: "error" })
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
            setShowPopup({ enable: true, type: "success" })
            setTimeout(() => {
              setShowPopup({ enable: false, type: "success" })
            }, 5000)
          })
          .catch(() => {
            setShowPopup({ enable: true, type: "pending" })
            setTimeout(() => {
              setShowPopup({ enable: false, type: "pending" })
            }, 5000)
          })
      }
    },
    [isMetaMask]
  )

  return { addToken, showPopup }
}

export default useAddTokenToMetamask
