/* global BigInt */
export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  roundingIncrement: 5
})

/**
 * formatValue: Format a BigInt value to a human readable string
 *
 * @param {bigint} value
 * @param {number} decimals
 */
export const formatValue = (value, decimals) => {
  return numberFormatter.format(descaleValue(value, decimals)).toString()
}

/**
 * descaleValue: Descale a BigNumber value by 10**decimals
 *
 * @param {bigint} value
 * @param {number} decimals
 */
export const descaleValue = (value, decimals) => {
  return value / BigInt(10 ** decimals)
}
