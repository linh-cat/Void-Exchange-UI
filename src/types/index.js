import { isAddress } from "viem"

const isEthereumAddress = (props, propName, componentName) => {
  const address = props[propName]
  if (!isAddress(address)) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expected an Ethereum address`)
  }
}

export { isEthereumAddress }
