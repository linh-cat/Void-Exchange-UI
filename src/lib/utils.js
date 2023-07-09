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