/**
 * @param {BigInt} purchaseAmount
 * @param {BigInt} price
 * @param {BigInt} leverage
*/

export const getCollateralValue = (purchaseAmount, price, leverage) => {
    if (purchaseAmount && leverage && price) {
        return purchaseAmount * leverage * price
    }
    return 0n
}