import { useContractWrite, useContractRead, useWaitForTransaction, erc20ABI } from "wagmi"
import { parseUnits, formatUnits } from "viem"

const useAllowance = ({ token, tokenDecimals, account, spender }) => {
  const { data: allowance, isLoading: isFetchingAllowance } = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account, spender],
    watch: true
  })

  const { data, write } = useContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: "approve"
  })

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data?.hash
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
  }

  return {
    allowance: formatUnits(allowance || "0", tokenDecimals),
    isSufficient,
    approve,
    isFetchingAllowance,
    isApproving
  }
}

export default useAllowance
