import { Constants } from "@void-0x/void-sdk"
import { BTC, ETH } from "@img/token"

const { ChainId } = Constants

const AddressToSymbolMap = {
  [Constants.ChainId.BaseGoerli]: {
    [Constants.Addresses[ChainId.BaseGoerli].IndexTokens.WBTC]: "WBTC",
    [Constants.Addresses[ChainId.BaseGoerli].IndexTokens.WETH]: "WETH"
  },

  [Constants.ChainId.Sepolia]: {
    [Constants.Addresses[ChainId.Sepolia].IndexTokens.WBTC]: "WBTC",
    [Constants.Addresses[ChainId.Sepolia].IndexTokens.WETH]: "WETH"
  }
}

const Tokens = {
  [Constants.ChainId.BaseGoerli]: {
    WBTC: {
      address: Constants.Addresses[ChainId.BaseGoerli].IndexTokens.WBTC,
      decimals: 8,
      icon: BTC,
      symbol: "WBTC",
      name: "BTC"
    },
    WETH: {
      address: Constants.Addresses[ChainId.BaseGoerli].IndexTokens.WETH,
      decimals: 18,
      icon: ETH,
      symbol: "WETH",
      name: "ETH"
    }
  },

  [Constants.ChainId.Sepolia]: {
    WBTC: {
      address: Constants.Addresses[ChainId.Sepolia].IndexTokens.WBTC,
      decimals: 8,
      icon: BTC,
      symbol: "WBTC",
      name: "BTC"
    },
    WETH: {
      address: Constants.Addresses[ChainId.Sepolia].IndexTokens.WETH,
      decimals: 18,
      icon: ETH,
      symbol: "WETH",
      name: "ETH"
    }
  }
}

export { AddressToSymbolMap, Tokens }
