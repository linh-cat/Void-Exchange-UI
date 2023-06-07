import { useState, useCallback } from "react"
import { useContractWrite, useContractRead, useWaitForTransaction, erc20ABI, usePublicClient } from "wagmi"
import { parseUnits, formatUnits } from "viem"

const useAllowance = ({ token, tokenDecimals, account, spender }) => {
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

  const { isLoading, data, write } = useContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve"
  })

  const isSufficient = (allowance, amount) => {
    const expectedAllowance = parseUnits(amount.toString(), tokenDecimals)
    if (allowance && allowance >= expectedAllowance) {
      return true
    }

    return false
  }

  const approve = (amount) => {
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
