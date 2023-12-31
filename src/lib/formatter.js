/* global BigInt */
const defaultOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  roundingIncrement: 5
}

export const numberFormatter = new Intl.NumberFormat("en-US", defaultOptions)

export const formatPercentage = (value) => {
  if (!value) return "0"
  return `${parseFloat(value).toFixed(2)}%`
}

/**
 * format value with decimal
 *
 * @param {value} Number
 * @param {decimals} Number
 */

export const formatDollarDecimals = (value, decimals) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    roundingIncrement: 5
  })
  if (value !== 0) {
    return formatter.format(value)
  }
  return '$0'
}

/**
 * formatValue: Format a BigInt value to a human readable string
 *
 * @param {bigint} value
 * @param {number} decimals
 * @param {bool} withDollarSign
 */

export const formatValue = (value, decimals, withDollarSign = true) => {
  return numberFormatter
    .format(descaleValue(value, decimals))
    .toString()
    .replace("$", withDollarSign ? "$" : "")
}

export const formatDollar = (value) => {
  if (value !== 0) {
    return numberFormatter.format(value)
  }
  return '$0'
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
  if (!isNaN(num)) {
    const parseNum = Number(num)

    if (Number.isInteger(parseNum)) {
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
export const formatDecimals = (num, decimals = 2) => {
  return num === "0" || isNaN(num) ? 0 : isInt(num) ? num : parseFloat(num).toFixed(decimals)
}
