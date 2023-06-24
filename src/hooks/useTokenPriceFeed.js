import { useMemo } from "react"
import { useContractRead, useContractReads, useNetwork } from "wagmi"
import FastPriceFeedABI from "../abis/FastPriceFeed.json"
import { Constants } from "@void-0x/void-sdk"

const useTokenPriceFeed = (tokenAddresses) => {
  const { chain } = useNetwork()

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

  return { prices }
}

export const useTokenPrice = (tokenAddress) => {
  const { chain } = useNetwork()

  const { data: price } = useContractRead({
    address: Constants.Addresses[chain?.id]?.PriceFeed,
    abi: FastPriceFeedABI.abi,
    functionName: "getPrice",
    args: [tokenAddress, true],
    onError: (error) => {
      console.error(error)
    }
  })

  return price
}

export default useTokenPriceFeed
