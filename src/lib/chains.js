import { Constants } from "@void-0x/void-sdk"

const { ChainId } = Constants

export const isChainSupported = (chain) => {
  const chainIds = [ChainId.Sepolia, ChainId.Goerli]
  return chainIds.includes(chain.id)
}
