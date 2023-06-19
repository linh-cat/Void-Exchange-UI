import { useMemo } from "react"
import { useContractRead, useContractReads, useNetwork } from "wagmi"
import FastPriceFeedABI from "../abis/FastPriceFeed.json"
import { Constants } from "@void-0x/void-sdk"

const useTokenPriceFeed = (tokenAddresses) => {
  const { chain } = useNetwork()

  // TODO: remove indexPrice
  const {
    data: indexPrice,
  } = useContractRead({
    address: Constants.Addresses[chain?.id]?.PriceFeed,
    abi: FastPriceFeedABI.abi,
    functionName: "getPrice",
    args: [tokenAddresses[0], true],
    onError: (error) => {
      console.error(error)
    }
  })

  const { data } = useContractReads({
    contracts: tokenAddresses.map((tokenAddress) => ({
      address: Constants.Addresses[chain?.id]?.PriceFeed,
      abi: FastPriceFeedABI.abi,
      functionName: "getPrice",
      args: [tokenAddress, true]
    })),
    watch: true, // refresh balance on new blocks
    watchInterval: 2000
  })

  const prices = useMemo(() => {
    const result = {}

    if (!data) {
      return result
    }

    data.forEach((item, index) => {
      result[tokenAddresses[index]] = item.result
    })

    return result
  }, [data, tokenAddresses])

  return { indexPrice, prices }
}

export default useTokenPriceFeed
