/**
 * @param {BigInt} purchaseAmount
 * @param {BigInt} currentPrice
*/

export const getCollateralValue = (purchaseAmount, currentPrice) => {
    if (purchaseAmount && currentPrice) {
        return purchaseAmount * currentPrice
    }
    return 0n
}

/**
 * @param {String} string
 * @param {Number} limit
*/

export const truncate = (string, limit) => {
    if (string.length <= limit) {
        return string
    }
    return string.slice(0, limit) + "..." + string.slice(string.length - 4, string.length)
}

/**
 * @param {String} data
*/
export function getPageTitle(data) {
    return `${data} | Decentralized
    Perpetual Exchange | Void Exchange`;
}