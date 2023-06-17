import { useContractRead, useNetwork } from "wagmi"
import FastPriceFeedABI from "../abis/FastPriceFeed.json"
import { Constants } from "@void-0x/void-sdk"

const useTokenPriceFeed = (tokenAddress) => {
  const { chain } = useNetwork()

  const {
    data: indexPrice,
    isError,
    isLoading
  } = useContractRead({
    address: Constants.Addresses[chain?.id]?.PriceFeed,
    abi: FastPriceFeedABI.abi,
    functionName: "getPrice",
    args: [tokenAddress, true],
    onError: (error) => {
      console.error(error)
    }
  })

  return { indexPrice }
}

export default useTokenPriceFeed
