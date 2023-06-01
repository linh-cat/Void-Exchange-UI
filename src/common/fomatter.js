export const decialNumber = (num, decimal = 2) => {
  return num === "0" ? 0 : parseFloat(num).toFixed(decimal)
}
