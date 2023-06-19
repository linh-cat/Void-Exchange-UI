import { Constants } from "@void-0x/void-sdk"

const { ChainId } = Constants

export const isChainSupported = (chain) => {
  if (!chain) {
    return false
  }

  const chainIds = [ChainId.Sepolia, ChainId.BaseGoerli]
  return chainIds.includes(chain.id)
}
