import { BigNumber } from 'ethers'

export function approveMinimalAmmount(
  decimals: number,
  mintAmount: BigNumber
): BigNumber {
  const defaultApproveAmount = BigNumber.from(10).pow(decimals).mul(100)

  if (defaultApproveAmount.gt(mintAmount)) {
    return defaultApproveAmount
  }
  return mintAmount
}
