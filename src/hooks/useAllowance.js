import { useState, useCallback } from "react"
import { useContractWrite, useContractRead, useWaitForTransaction, erc20ABI, usePublicClient } from "wagmi"
import { parseUnits, formatUnits } from "viem"

const useAllowance = ({ token, tokenDecimals, account, spender }) => {
  console.log("tokenDecimals", tokenDecimals)
  const [isSuccess, setIsSuccess] = useState(false)
  const publicClient = usePublicClient()

  const {
    data: allowance,
    isError,
    isLoading: isFetchingAllowance
  } = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account, spender],
    watch: true
  })

  console.log("allowance  useAllowance", allowance)

  const { isLoading, data, write } = useContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve"
  })

  const isSufficient = (allowance, amount) => {
    const expectedAllowance = parseUnits(amount.toString(), tokenDecimals)
    console.log("allowance", allowance, expectedAllowance)
    if (allowance && allowance >= expectedAllowance) {
      return true
    }

    return false
  }

  const approve = (amount) => {
    console.log("tokenDecimals inside approve", tokenDecimals)
    console.log("isSufficient", isSufficient(allowance, amount))
    console.log("data", data)
    if (!tokenDecimals) {
      return
    }

    if (isSufficient(allowance, amount)) {
      return
    }

    const args = {
      from: account,
      args: [spender, parseUnits(amount.toString(), tokenDecimals)]
    }

    console.log("args", args)

    write(args)

    // if (data) {
    //   await publicClient.waitForTransactionReceipt({ hash: data.hash })
    // }

    setIsSuccess(isSuccess)
  }

  return {
    allowance: formatUnits(allowance || "0", tokenDecimals),
    isSufficient,
    approve,
    isError,
    isFetchingAllowance,
    isLoading,
    isSuccess
  }
}

export default useAllowance
