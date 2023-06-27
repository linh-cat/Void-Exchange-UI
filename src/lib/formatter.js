/* global BigInt */
export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  roundingIncrement: 5
})



export const percentateFormatter = (value) => {
  if (!value) return "0"
  return `${parseFloat(value * 100).toFixed(2)} %`
}

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

/**
 *
 * @param {Number} num
 */ export const isInt = (num) => {
  if (typeof num == "number" && !isNaN(num)) {
    if (Number.isInteger(num)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
/**
 *
 * @param {String} num
 * @param {number} decimals
 */
export const decimalsFormatter = (num, decimals = 2) => {
  return num === "0" ? 0 : !isInt(num) ? parseFloat(num).toFixed(decimals) : num
}
