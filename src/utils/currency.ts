import { BigNumber, BigNumberish } from 'ethers'

export function formatCurrency(amount: BigNumberish, decimals: number): string {
  const amountWithPercents = BigNumber.from(amount)
    .div(BigNumber.from(10).pow(decimals - 2))
    .toString()

  return `${
    amountWithPercents.substring(0, amountWithPercents.length - 2) || '0'
  }.${amountWithPercents.substring(amountWithPercents.length - 2) || '00'}`
}
